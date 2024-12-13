import React from 'react';
import HomePage from '../components/home';
import Logos from "../components/logo";
import Residency from '../components/residency';
import ValueSection from '../components/valueSection';
import { Box } from '@mui/material';


const Website = () => {
  return (
    <Box style={{
      margin: 0, 
      padding: 0,
      width: '100vw', 
      overflowX: 'hidden'
    }}>
      <HomePage />
      <Logos />
      <Residency />
      <ValueSection />
      
    </Box>
  );
};

export default Website;
