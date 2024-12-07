import React, { useState } from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import "./Address.css";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const handleContinue = () => {};

  return (
    <Box className="login-page">
      <Box className="login-box">
        <Typography variant="h5" className="login-heading">
          ENTER YOUR ADDRESS
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className="login-subtitle"
        >
          Your ordered will be delivered in the above mentioned address
        </Typography>

        <Box className="address_content">
          <TextField
            variant="outlined"
            placeholder="House / Flat / Floor Number*"
            required
            className="address_text"
          />
          <TextField
            variant="outlined"
            placeholder="Apartment / Road / Area*"
            required
            className="address_text"
          />
          <TextField
            variant="outlined"
            placeholder="City / State*"
            required
            className="address_text"
          />
          <TextField
            variant="outlined"
            placeholder="Pincode*"
            required
            className="address_text"
          />
        </Box>

        <Button
          variant="contained"
          className="continue-button"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Address;
