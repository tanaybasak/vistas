import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import './Otp.css'
import { firebaseApp } from "../../firebaseConfig"; // Ensure you have Firebase initialized

const OTPPage = () => {
const handleOtp = () => {}

  return (
    <Box className="login-page">
    <Box className="login-box">
      <Typography variant="h5" className="login-heading">
        VERIFY WITH OTP
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" className="login-subtitle"> Sent to 8638974203</Typography>

      <Box className="otp_text_field">
      <TextField
          variant="outlined"
          className="otp_text"
          required
        />
          <TextField
          variant="outlined"
          className="otp_text"
          required

        />
          <TextField
          variant="outlined"
          className="otp_text"
          required

        />
          <TextField
          variant="outlined"
          className="otp_text"
          required

        />
      </Box>
      <br />
      <Button
        variant="contained"
        className="continue-button"
        onClick={handleOtp}
      >
        Continue
      </Button>
    </Box>
  </Box>
  );
};

export default OTPPage;
