import React from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const logos = [
  '/images/com11.png',
  '/images/com21.png',
  '/images/com31.png',
  '/images/com41.png',
];

const Logos = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? 1 : 9, // Adjust spacing based on screen size
        mt: 5,
        flexWrap: 'wrap', // Allow logos to wrap on smaller screens
        padding: isMobile ? '0 10px' : '0', // Add padding on mobile if needed
      }}
    >
      {logos.map((logo, index) => (
        <Box
          key={index}
          component="img"
          src={logo}
          alt={`Logo ${index + 1}`}
          sx={{
            height: isMobile ? 30 : 70, // Adjust logo height based on screen size
            width: 'auto',
            maxWidth: isMobile ? '80px' : 'auto', // Limit width on mobile
          }}
        />
      ))}
    </Box>
  );
};

export default Logos;

