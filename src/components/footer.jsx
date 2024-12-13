import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const Footer = () => {
    return (
        <>
            <hr />
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: { xs: '10px 20px', sm: '20px 40px', md: '20px 10px' }, 
                    height: 'auto', 
                    width: '98vw',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    textAlign={{ xs: 'center', sm: 'left' }} 
                >
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ mt: 2 }}>
                            <Box
                                component="img"
                                sx={{
                                    height: { xs: 40, sm: 50, md: 60 }, 
                                    mx: 'auto', 
                                }}
                                src="/images/logo.png"
                                alt="Logo"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#25204b',
                                    fontFamily: 'Poppins',
                                    fontWeight: 800,
                                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' }, 
                                }}
                            >
                                Information
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#707070',
                                    fontFamily: 'Poppins',
                                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }, 
                                }}
                            >
                                Noida, Gautam Budh Nagar, Uttar Pradesh, 201301
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Footer;
