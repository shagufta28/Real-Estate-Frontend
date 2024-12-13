import React from 'react';
import { Box, TextField, Button, InputAdornment, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Search = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = () => {
    alert('Search button clicked');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 1 : 2,
        maxWidth: "100%",
        width: isMobile ? "90%" : "70vh",
        borderRadius: 20,
        padding: isMobile ? 1 : 2,
        backgroundColor: 'white',
        margin: '0', // Center align on mobile
      }}
    >
      {/* Keyword Input */}
      <TextField
        label="Search Keyword"
        variant="outlined"
        sx={{
          flexGrow: 1,
          width: isMobile ? "100%" : "auto",
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "30px",
                  padding: isMobile ? "8px 20px" : "10px 30px",
                  backgroundColor: "#1976d2",
                  textTransform: 'none',
                  width: isMobile ? "100%" : "auto",
                }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
