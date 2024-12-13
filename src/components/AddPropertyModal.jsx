import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Typography, Modal, Container } from '@mui/material';
import AddLocation from './AddLocation'; 
import UploadImage from './UploadImage';
import PropertyDetails from './BasicDetails';
import Facilities from './Facilities'; // Import the Facilities component

const steps = [
  {
    label: 'Location',
    description: 'Address',
  },
  {
    label: 'Upload Image',
    description: 'Upload property images',
  },
  {
    label: 'Property Details',
    description: 'Enter title, description, and additional details',
  },
  {
    label: 'Facilities',
    description: 'Select property facilities',
  },
];

const AddPropertyModal = ({ opened, setOpened }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [propertyDetails, setPropertyDetails] = useState({
    country: '',
    city: '',
    address: '',
    image: [],
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    facilities: {}, // Add facilities field in propertyDetails
  });

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};

    // Validate fields based on active step
    if (activeStep === 0) {
        if (!propertyDetails.country) newErrors.country = "Country is required.";
        if (!propertyDetails.city) newErrors.city = "City is required.";
        if (!propertyDetails.address) newErrors.address = "Address is required.";
      } else if (activeStep === 2) { // Validation for BasicDetails
        if (!propertyDetails.title) newErrors.title = "Title is required.";
        if (!propertyDetails.description) newErrors.description = "Description is required.";
        if (!propertyDetails.price) newErrors.price = "Price is required.";
      }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; 
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setPropertyDetails({ country: '', city: '', address: '', title: '', description: '', price: '', bedrooms: '', bathrooms: '', parking: '', image: [], facilities: {} });
    setErrors({});
  };

  return (
    <Modal
      open={opened}
      onClose={() => setOpened(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '10px',
          width: '80%',
          height: '600px', // Increased height to accommodate new fields
          minHeight: '400px',
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>
                <Box>
                  {step.label}
                  <Typography variant="caption"> <br />{step.description}</Typography>
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mt: 4 }}>
          {activeStep === steps.length ? (
            <Box>
              <Typography>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          ) : (
            <Box>
              {activeStep === 0 ? (
                <AddLocation propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} errors={errors} />
              ) : activeStep === 1 ? (
                <UploadImage propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
              ) : activeStep === 2 ? (
                <PropertyDetails propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} errors={errors} />
              ) : (
                <Facilities propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} /> // Facilities step
              )}
              
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {activeStep !== 3 && ( // Remove buttons from Facilities step
                  <>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1, backgroundColor: 'red' }}
                    >
                      Back
                    </Button>
                    <Button onClick={handleNext} sx={{ backgroundColor: '#c6f9d9' }}>
                      {activeStep === steps.length - 2 ? 'Next' : 'Next'}
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
