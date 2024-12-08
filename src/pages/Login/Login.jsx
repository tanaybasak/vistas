import { Box, Typography, Button } from "@mui/material";
import "./Login.css";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
  const handleContinue = () => {
    navigate('/otp')
  };

  return (
    <Box className="login-page">
      <Box className="login-box">
        <Typography variant="h5" className="login-heading">
          LOGIN or SIGNUP
        </Typography>

        <Box className="login_content">
          <InputField
            placeholder="+91 | Mobile Number*"
            type="text"
            className="login_text"
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
            fullWidth
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
