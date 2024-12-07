import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const handleContinue = () => {
        if (phoneNumber) {
          // Pass phone number to the OTP page
          navigate('/otp', { state: { phoneNumber } });
        } else {
          alert('Please enter a valid phone number');
        }
      };
    
  return (
    <Box className="login-page">
      <Box className="login-box">
        <Typography variant="h5" className="login-heading">
          LOG IN or SIGN UP
        </Typography>
        
          <TextField
            variant="outlined"
            placeholder="+91 | Mobile number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}

            sx={{
                width: '25rem',
                marginBottom: '1rem',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        <Typography variant="body2" className="terms-text">
          By continuing, I agree to the{' '}
          <span>Terms of use</span> & <span>Privacy policy</span>
        </Typography>
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

export default Login;
