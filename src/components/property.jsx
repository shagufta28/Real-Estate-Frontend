import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from '../utils/api';
import { PuffLoader } from "react-spinners";
import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import useAuthCheck from "./hooks/useAuthCheck";
import BookingModel from "./BookingModel";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailsContext from "../context/UserDetailsContext";
import { remove } from "lodash";
import { toast } from "react-toastify";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const [modalOpened, setModalOpened] = useState(false)
  const { validateLogin } = useAuthCheck()
  const { user } = useAuth0()

  const { userDetails: { token, bookings }, setUserDetails } = useContext(UserDetailsContext)

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: async () => {
      try {
        await removeBooking(id, user?.email, token);
      } catch (err) {
        // Display a more specific error message
      }
    },
    onSuccess: () => {
      setUserDetails((prev)=>({
        ...prev,
        bookings: prev.bookings.filter((booking)=>booking?.id !== id)
      }))
      toast.success("Booking Cancelled", {position: 'bottom-right'});
    }, 
  });


  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PuffLoader />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Error while fetching the property details
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "90vw", overflowX: "hidden", padding: { xs: 2, md: 4 }, mt: 10 }}>
      <Grid container spacing={3}>
        {/* Left side (Main Image) */}
        <Grid item xs={12} md={8}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={data?.image}
              alt="home image"
              sx={{ width: "100%", borderRadius: 4, objectFit: "cover" }}
            />
          </Box>
        </Grid>

        {/* Right side (Details) */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ color: "#25204b", fontFamily: "Poppins", fontWeight: 800, fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' } }}>
            {data?.title}
          </Typography>
          <Typography variant="h4" color="secondary" fontFamily="Poppins" sx={{ color: "#008000", fontWeight: 500 }} gutterBottom>
            $ {data?.price}
          </Typography>

          <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
            {/* Bathrooms */}
            <Grid item>
              <IconButton color="primary">
                <FaShower />
              </IconButton>
              <Typography color="black" variant="body1" component="span">
                {data?.facilities?.bathrooms}
              </Typography>
            </Grid>

            {/* Parking */}
            <Grid item>
              <IconButton color="primary">
                <AiTwotoneCar />
              </IconButton>
              <Typography color="black" variant="body1" component="span">
                {data?.facilities?.parking}
              </Typography>
            </Grid>

            {/* Rooms */}
            <Grid item>
              <IconButton color="primary">
                <MdMeetingRoom />
              </IconButton>
              <Typography color="black" variant="body1" component="span">
                {data?.facilities?.bedrooms}
              </Typography>
            </Grid>
          </Grid>

          {/* Description */}
          <Typography
            color="textSecondary"
            sx={{ textAlign: "justify", mb: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            {data?.description}
          </Typography>

          {/* Address */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" color="black">
              {data?.address}, {data?.city}, {data?.country}
            </Typography>
          </Box>

          {/* Book the Property Button */}
          {
            bookings?.map((booking) => booking.id).includes(id) ? (
              <>
              <Button variant="outline" w={"100%"} fullWidth onClick={()=> cancelBooking()} disabled={cancelling}
              sx={{
                marginTop: 3,
                backgroundColor: '#ff4242',
                borderRadius: 10,
                color: 'white',
                boxShadow: '0px 4px 10px rgba(31, 106, 190, 0.855)',
                '&:hover': {
                  backgroundColor: '#ff0000',
                  color: 'black',
                },
              }}> Cancel Booking</Button>
              <Typography color="black" m="1rem">Your visit already booked for date {bookings?.filter((booking)=>booking?.id==id)[0].date}</Typography>
              </>
            ) : (
                <Button onClick = {() => {validateLogin() && setModalOpened(true) }}
          fullWidth
          sx={{
            marginTop: 3,
            backgroundColor: '#008efa',
            borderRadius: 10,
            color: 'white',
            boxShadow: '0px 4px 10px rgba(31, 106, 190, 0.855)',
            '&:hover': {
              backgroundColor: '#ffffff',
              color: 'black',
            },
          }}
          >
          Book Your Visit
        </Button>
            )}
        {user?.email && (
          <BookingModel
            opened={modalOpened}
            setOpened={setModalOpened}
            propertyId={id}
            email={user.email}
          />
        )}
      </Grid>
    </Grid>
    </Box >
  );
};

export default Property;
