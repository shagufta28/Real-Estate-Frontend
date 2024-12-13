import React from 'react';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import Search from './Search';

const HomePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
        sx={{
            backgroundImage: 'url("/images/background.png")',
            backgroundSize: 'cover', // Ensures the image covers the container
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat',
            minHeight: '70vh', // Ensures the container has at least 70vh height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center', // Centers text alignment
            padding: '20px',
            flexDirection: isMobile ? 'column' : 'row',
            margin: isMobile ? 0 : '40px auto', // Centered margin for desktop view
            width: '100%', // Full width to prevent overflow
            boxSizing: 'border-box', // Includes padding and borders in width calculation
        }}
        >
            <Box sx={{ textAlign: isMobile ? 'center' : 'left', width: isMobile ? '100%' : 'auto' }}>
                <Typography variant="h2" component="h1" sx={{ mb: 2, fontFamily: 'Merriweather', color: "black" , fontSize: isMobile ? "40px" : "60px" }}>
                    Discover <br /> Most Suitable <br /> Residencies
                </Typography>
                <Typography sx={{ mb: 2, fontFamily: 'Merriweather', color: "black", fontSize: isMobile ? "6px" : "10px" , mr: isMobile ? 0: 10 }}>
                    At UrbanNest, we’re dedicated to helping you find your dream home effortlessly. Whether you’re buying, <br /> selling, or renting, our intuitive platform connects you with the best properties and experts <br /> in the market.
                </Typography>
                <Search/>
            </Box>
            {!isMobile && (
                <Box
                    component="img"
                    sx={{ height: '450px', width: '45vh', borderRadius: "0rem 0 0rem 5rem", boxShadow: '15px 10px 50px rgba(0, 0, 0, 0.6)', mt: 7 }}
                    src="/images/house.jpg"
                    alt="House"
                />
            )}
        </Box>
    );
};

export default HomePage;


