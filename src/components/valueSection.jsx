import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import data from '../utils/accordion';

const ValueSection = () => {
    const [expanded, setExpanded] = useState(0);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            id="value"
            className="v-wrapper"
            sx={{
                padding: '40px',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                className="paddings innerWidth flexCenter v-container"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on mobile
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Left Side (Image) */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'block' }, // Hide on mobile
                        maxWidth: '45%',
                        ml: 20,
                    }}
                >
                    <Card
                        sx={{
                            
                            borderRadius: '0 10rem 0 0',
                            boxShadow: '2px 2px 20px #a3a1a1',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="450"
                            image="./images/bg2.jpg"
                            alt="Value"
                        />
                    </Card>
                </Box>

                {/* Right Side (Accordion) */}
                <Box
                    className="flexColStart v-right"
                    sx={{
                        maxWidth: { xs: '100%', md: '45%' }, // Full width on mobile
                        textAlign: { xs: 'center', md: 'left' }, // Center text on mobile
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#ffc61d',
                            fontFamily: 'Poppins',
                            fontWeight: 500,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Smaller font size on mobile
                        }}
                    >
                        Our Value
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#25204b',
                            fontFamily: 'Poppins',
                            fontWeight: 800,
                            margin: '10px 0',
                            fontSize: { xs: '1.5rem', sm: '2rem' }, // Smaller font size on mobile
                        }}
                    >
                        Value We Give to You
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#707070',
                            fontFamily: 'Poppins',
                            marginBottom: '20px',
                            fontSize: { xs: '0.875rem', sm: '1rem' }, // Smaller font size on mobile
                        }}
                    >
                        We always ready to help by providing the best services for you.
                        <br />
                        We believe a good place to live can make your life better.
                    </Typography>

                    {data.map((item, i) => (
                        <Accordion
                            key={i}
                            expanded={expanded === i}
                            onChange={handleChange(i)}
                            sx={{
                                marginBottom: '10px',
                                borderRadius: '10px',
                                boxShadow: 'none',
                                border: '1px solid #a18eff',
                                fontSize: { xs: '0.875rem', sm: '1rem' }, // Smaller font size on mobile
                                mx: { xs: 'auto', md: 0 }, // Center accordion on mobile
                                width: { xs: '100%', md: 'auto' }, // Full width on mobile
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${i}-content`}
                                id={`panel${i}-header`}
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ marginRight: '10px', color: '#5A73D8' }}>{item.icon}</Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: '#25204b',
                                            fontFamily: 'Poppins',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.heading}
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#707070',
                                        fontFamily: 'Poppins',
                                    }}
                                >
                                    {item.detail}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ValueSection;
