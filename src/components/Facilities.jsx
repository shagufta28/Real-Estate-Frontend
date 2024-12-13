import React, { useContext } from "react";
import { Box, Button, Grid, TextField, Typography, Paper, CircularProgress } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "@mantine/form";  
import UserDetailContext from "../context/UserDetailsContext.js";
import useProperties from "./hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../utils/api.js";

const Facilities = ({ prevStep, propertyDetails, setPropertyDetails, setOpened, setActiveStep }) => {
  const { getAccessTokenSilently } = useAuth0();
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms || 0,
      parkings: propertyDetails.facilities.parkings || 0,
      bathrooms: propertyDetails.facilities.bathrooms || 0,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one bedroom" : null),
      bathrooms: (value) => (value < 1 ? "Must have at least one bathroom" : null),
    },
  });

  const { user } = useAuth0();
  const { userDetails: { token } } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: async() => {
      try {
        const token = await getAccessTokenSilently();  // Fetch a fresh token
        await  createResidency(
          {
            ...propertyDetails,
            facilities: { ...form.values },
          },
          token
        )
      } catch (error) {
        throw error
      }
    },
     
    onError: ({ response }) => {
      toast.error(response.data.message, { position: "bottom-right" });
    },
    onSettled: () => {
      toast.success("Property added successfully", { position: "bottom-right" });
      setPropertyDetails({ ...initialPropertyDetails, userEmail: user?.email });
      setOpened(false);  // Close the modal after success
      setActiveStep(0);  // Reset to the first step
      refetchProperties();
    },
  });

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { ...form.values },
      }));
      mutate();  // Trigger the mutation
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Property Facilities
      </Typography>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Number of Bedrooms"
              required
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={form.values.bedrooms}
              onChange={(e) => form.setFieldValue("bedrooms", e.target.value)}
              error={!!form.errors.bedrooms}
              helperText={form.errors.bedrooms}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Parking Spaces"
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={form.values.parkings}
              onChange={(e) => form.setFieldValue("parkings", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Bathrooms"
              required
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={form.values.bathrooms}
              onChange={(e) => form.setFieldValue("bathrooms", e.target.value)}
              error={!!form.errors.bathrooms}
              helperText={form.errors.bathrooms}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" onClick={prevStep}>
            Back
          </Button>
          
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={isLoading}
            endIcon={isLoading && <CircularProgress size={20} color="inherit" />}
          >
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Facilities;
