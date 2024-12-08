import React, { useState } from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import "./Address.css";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";

const Address = () => {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate('/order')
  };

  return (
    <Box className="address-page">
      <Box className="address-box">
        <Typography variant="h5" className="address-heading">
          ENTER YOUR ADDRESS
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className="address-subtitle"
        >
          Your ordered will be delivered in the above <br/> mentioned address
        </Typography>

        <Box className="address_content">
          <InputField
            placeholder="House / Flat / Floor Number*"
            type="text"
            className="address_text"
          />
          <InputField
            placeholder="House / Flat / Floor Number*"
            type="text"
            className="address_text"
          />
           <InputField
            placeholder="House / Flat / Floor Number*"
            type="text"
            className="address_text"
          />
           <InputField
            placeholder="House / Flat / Floor Number*"
            type="text"
            className="address_text"
          />

        <Button
          variant="contained"
          className="continue-button address_btn"
          onClick={handleContinue}
          fullWidth
        >
          Continue
        </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default Address;
