import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Layout from './components/Layout/Layout';
import Website from './pages/website';
import { Suspense } from 'react';
import Properties from './components/properties';
import Login from './components/Login';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from 'react-query/devtools'
import Property from './components/property';
import UserDetailsContext from './context/UserDetailsContext';
import ProfilePage from './components/ProfilePage';

const App = () => {

  const [userDetails, setUserDetails] = useState({
    bookings: [],
    token: null
  })
  const queryClient = new QueryClient()

  return (

    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Typography>Loading .....</Typography>}>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Website />} />
                <Route path='/properties'>
                  <Route index element={<Properties />} />
                  <Route path=':propertyId' element={<Property />} />
                </Route>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailsContext.Provider>
  );
};

export default App;
