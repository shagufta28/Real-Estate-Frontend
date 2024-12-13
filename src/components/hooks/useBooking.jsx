import React, {useContext, useEffect, useRef} from "react";
import UserDetailsContext from "../../context/UserDetailsContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../../utils/api";

const useBooking = ()=> {

    const {userDetails, setUserDetails} = useContext(UserDetailsContext)
    const queryRef = useRef();
    const {user} = useAuth0();

    const {data, isLoading, isError, refetch, onSuccess} = useQuery({
        queryKey:"allBookings",
        queryFn: async () => {
            try {
              await getAllBookings(user?.email, userDetails?.token);
            } catch (err) {
              // Display a more specific error message
            }
          },
          onSuccess: (data) => 
            setUserDetails((prev)=>({ ...prev, bookings: data || [] })),     
    })
    queryRef.current = refetch;

    useEffect(() => {
        queryRef.current && queryRef.current();
      }, [userDetails?.token]);

    return {data, isError, isLoading, refetch};
};

export default useBooking;