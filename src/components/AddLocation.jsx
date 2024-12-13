// AddLocation.js
import React from 'react';
import { TextField, Box } from '@mui/material';

const AddLocation = ({ propertyDetails, setPropertyDetails, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <TextField
        label="Country"
        name="country"
        value={propertyDetails.country}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.country}
        helperText={errors.country}
        margin="normal"
      />
      <TextField
        label="City"
        name="city"
        value={propertyDetails.city}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.city}
        helperText={errors.city}
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={propertyDetails.address}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.address}
        helperText={errors.address}
        margin="normal"
      />
    </Box>
  );
};

export default AddLocation;
