import React from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { truncate } from 'lodash';
import { useNavigate } from 'react-router-dom';

const ResidentList = ({ card }) => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        gap: 2, // Adjust gap between cards if needed
        overflowX: 'hidden', // Prevent horizontal scroll
      }}
    >
      <Box 
        sx={{ 
          width: { xs: '100%', sm: 200 }, // Full width on small screens, fixed width on larger screens
          mb: 2 // Margin bottom for spacing between rows
        }}
      >
        <Card
          onClick={() => navigate(`../properties/${card.id}`)}
          sx={{
            width: '100%', // Full width of the container
            height: 300,
            boxShadow: "none",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              background: 'linear-gradient(190deg, #ffffff, #fdf9ff)',
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image={card.image}
              alt={card.name}
              sx={{ borderRadius: 2, width: '100%', objectFit: 'cover', padding: '2px 2px' }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ color: "orange", fontFamily: "Poppins", fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                ${card.price}
              </Typography>
              <Typography variant="h6" sx={{ color: "black", fontFamily: "Poppins", fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                {truncate(card.title, { length: 15 })}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "Poppins", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                {truncate(card.description, { length: 88 })}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default ResidentList;
