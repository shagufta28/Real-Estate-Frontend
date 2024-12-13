import React, { useContext, useEffect } from 'react';
import Footer from '../footer';
import { createHashRouter, Outlet } from 'react-router-dom';
import Navbar from '../navbar';
import { Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailsContext from '../../context/UserDetailsContext';
import { useMutation } from 'react-query';
import { createUser } from '../../utils/api';
import useBooking from '../hooks/useBooking';

const Layout = () => {
  useBooking()

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0()
  const { setUserDetails } = useContext(UserDetailsContext)

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email , token)
  })

  useEffect(() => {

    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "https://real-estate-backend-ut61.onrender.com",
          scope: "openid profile email"
        }
      })
      localStorage.setItem("access_token", res)
      setUserDetails((prev) => ({ ...prev, token: res }))
      mutate(res)
    }

    isAuthenticated && getTokenAndRegister()
  }, { isAuthenticated })
  return (
    <>
      <Box>
        <Navbar />
        <Outlet />

      </Box>
      <Footer />
    </>
  );
};

export default Layout;
