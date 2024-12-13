// BasicDetails.js
import React from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';

const BasicDetails = ({ propertyDetails, setPropertyDetails, errors, nextStep }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">Basic Property Details</Typography>
        
        <TextField
          label="Title"
          variant="outlined"
          value={propertyDetails.title}
          onChange={(e) => setPropertyDetails((prev) => ({ ...prev, title: e.target.value }))}
          error={!!errors.title}
          helperText={errors.title}
          fullWidth
        />
        
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={propertyDetails.description}
          onChange={(e) => setPropertyDetails((prev) => ({ ...prev, description: e.target.value }))}
          error={!!errors.description}
          helperText={errors.description}
          fullWidth
          sx={{ mt: 2 }}
        />
        
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          value={propertyDetails.price}
          onChange={(e) => setPropertyDetails((prev) => ({ ...prev, price: e.target.value }))}
          error={!!errors.price}
          helperText={errors.price}
          fullWidth
          sx={{ mt: 2 }}
        />
      </Box>
      
    </Box>
  );
};

export default BasicDetails;
