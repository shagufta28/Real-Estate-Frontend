import React from 'react';
import { Typography, Avatar, Box } from '@mui/material';

const ProfilePage = ({ user, bookings }) => {
  // Ensure user and bookings data are available before rendering
  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      {/* User Profile */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Avatar 
          src={user.picture} 
          alt={user.name} 
          style={{ width: '100px', height: '100px', marginBottom: '10px' }}
        />
        <Typography variant="h5" color="black">
          {user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {user.email}
        </Typography>
      </div>

      {/* Bookings Section */}
      <Typography variant="h6" color="black" gutterBottom>
        My Bookings
      </Typography>
      
      {/* Display Bookings */}
      {bookings && bookings.length > 0 ? (
        <Box>
          {bookings.map((booking, index) => (
            <Box key={index} sx={{ marginBottom: '15px' }}>
              <Typography variant="body1" color="black">
                Property: {booking.propertyName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {booking.date}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary">
          You have no bookings yet.
        </Typography>
      )}
    </div>
  );
};

export default ProfilePage;
