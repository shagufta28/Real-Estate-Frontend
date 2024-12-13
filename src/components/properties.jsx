import { Box, Typography } from '@mui/material';
import React from 'react';
import Search from './Search';
import ResidentList from './ResidentList';
import useProperties from './hooks/useProperties';
import { PuffLoader } from 'react-spinners';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isError) {
    return (
      <Typography variant='h2' sx={{ color: 'black', textAlign: 'center' }}>
        Error While Fetching Data
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label='puff-loading'
        />
      </Box>
    );
  }

  return (
    <Box sx={{ overflowX: 'hidden', mb: 10 }}>
      {/* Background Image Section */}
      <Box
        sx={{
          backgroundImage: 'url("/images/bg4.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: isMobile ? '50vh' : '70vh',
          width: isMobile ? '60vh' : '99.2vw',
        }}
      />

      {/* Search Box Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          mt: isMobile ? -20 : -30,
          mr: isMobile ? 5 : 0,
          px: 2, // Padding on the sides to avoid overflow issues on small screens
        }}
      >
        <Search />
      </Box>

      {/* Title Section */}
      <Box
        sx={{
          mt: isMobile ? 15 : 25,
          mb: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#25204b",
            fontFamily: "Poppins",
            fontWeight: 800,
            fontSize: isMobile ? '1.5rem' : '2rem',
          }}
        >
          All Residencies
        </Typography>
      </Box>

      {/* Resident List Section */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mr: isMobile ? 5 : 0,
          ml: isMobile ? -4 : 0,
          gap: 5,
          justifyContent: 'center',
          px: 5,
          overflowX: 'hidden', // Prevent horizontal scrolling
        }}
      >
        {data.map((card, i) => (
          <ResidentList card={card} key={i} />
        ))}
      </Box>
    </Box>
  );
};

export default Properties;
