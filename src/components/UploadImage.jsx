// UploadImage.js
import React, { useState } from 'react';
import { Button, Box, Typography, IconButton, styled } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Input = styled('input')({
  display: 'none',
});

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setPropertyDetails((prev) => ({
      ...prev,
      image: files, // Update propertyDetails with selected files
    }));
  };

  const handleRemoveFile = (fileToRemove) => {
    const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
    setSelectedFiles(updatedFiles);
    setPropertyDetails((prev) => ({
      ...prev,
      image: updatedFiles, // Update propertyDetails with remaining files
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Upload Images</Typography>
      <label htmlFor="file-upload">
        <Input
          accept="image/*"
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        {selectedFiles.length === 0 ? (
          <IconButton component="span" color="primary" sx={{ mb: 2 }}>
            <PhotoCamera fontSize="large" />
          </IconButton>
        ) : (
          selectedFiles.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`upload-preview-${index}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                }}
              />
              <Typography variant="body2" color="textSecondary">{file.name}</Typography>
            </Box>
          ))
        )}
      </label>
      <Box>
        {selectedFiles.length > 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>Selected Images:</Typography>
        )}
        {selectedFiles.map((file, index) => (
          <Box key={index} display="flex" alignItems="center" mt={1}>
            <Typography variant="body2" mr={2}>{file.name}</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleRemoveFile(file)}
            >
              Remove
            </Button>
          </Box>
        ))}
      </Box>
      
    </Box>
  );
};

export default UploadImage;
