import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, InputAdornment, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '100vw',
            }}
        >
            <Grid container sx={{ width: '80vw', height: '80vh', overflow: 'hidden' , boxShadow: '10px 4px 20px rgba(0, 0, 0, 0.2)' , mt:7}}>
                <Grid item xs={12} sm={6} sx={{
                    backgroundImage: 'url(/images/bg3.jpg)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                }}>
                </Grid>
                <Grid item xs={12} sm={6} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fdfdfd',
                    padding: '20px',
                }}>
                    <Typography variant="h4" sx={{ mb: 4, color: '#25204b', fontFamily: 'Poppins' }}>
                        {isSignup ? 'Sign Up' : 'Login'}
                    </Typography>
                    <Card
                        sx={{
                            maxWidth: '400px',
                            width: '100%',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            animation: `${fadeIn} 0.5s ease-in-out`,
                            textAlign: 'center',
                        }}
                    >
                        <CardContent>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                           
                            
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mb: 2, backgroundColor: '#c9173e', '&:hover': { backgroundColor: '#110c3f' } }}
                            >
                                {isSignup ? 'Sign Up' : 'Login'}
                            </Button>
                            <Button
    variant="text"
    onClick={() => setIsSignup(!isSignup)}
    fullWidth
    sx={{
        color: '#e86130',
        textTransform: 'none',
        backgroundColor: 'transparent', 
        border: 'none',  
        '&:hover': {
            backgroundColor: 'transparent', 
        },
        '&:focus': {
            outline: 'none', 
        },
        '&:active': {
            backgroundColor: 'transparent', 
        }
    }}
>
    {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
</Button>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;
