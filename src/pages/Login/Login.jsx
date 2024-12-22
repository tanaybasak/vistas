import { Box, Typography, Button } from "@mui/material";
import "./Login.css";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertComponent from "../../components/Alert";
import config from '../../config.js';
const Login = () => {
  const [email, setEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.otpless = (otplessUser) => {
      alert(JSON.stringify(otplessUser));
    };
  }, []);

  // const validateEmail = (email) => {
  //   // Regex to validate email
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };

  // const handleEmailChange = (e) => {
  //   const value = e.target.value.trim();
  //   setEmail(value);
  //   setIsEmailValid(validateEmail(value));
  // };


  // const handleShowAlert = (message, severity) => {
  //   setAlertMessage(message);
  //   setAlertSeverity(severity);
  //   setAlertOpen(true);
  // };

  // const handleCloseAlert = () => {
  //   setAlertOpen(false);
  // };

  
  // const handleContinue = async () => {
  //   try {
  //     const response = await axios.post(`${config.baseURL}/otp/send-otp`, {
  //       email,
  //     });
  //     if (response.data.success) {
  //       handleShowAlert("Otp sent successfully!", "success");
  //       setTimeout(() => {
  //         navigate("/otp", { state: { email } });
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     handleShowAlert("Failed to send OTP", "failure");
  //   }
  // };

  return (
    <Box className="login-page">
      <Box className="login-box">
        {/* <Typography variant="h5" className="login-heading">
          LOGIN or SIGNUP
        </Typography>

        <Box className="login_content">
          <InputField
             placeholder="Enter your email*"
             type="email"
             className="login_text"
             onChange={handleEmailChange}
             value={email}
          />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className="login-subtitle"
          >
            By continuing, I agree to the Terms of use & Privacy policy
          </Typography>

          <Button
            variant="contained"
            className="continue-button login_button"
            onClick={handleContinue}
            disabled={!isEmailValid} // Button is enabled only if phone number is valid
            fullWidth
          >
            Continue
          </Button>
        </Box> */}
        <div id="otpless-login-page"></div>

      </Box>
      {/* <AlertComponent
        message={alertMessage}
        severity={alertSeverity}
        open={alertOpen}
        onClose={handleCloseAlert}
      /> */}
    </Box>
  );
};

export default Login;
