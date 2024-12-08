import { Box, Typography, Button } from "@mui/material";
import "./Otp.css";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";

const Otp = () => {
    const navigate = useNavigate()
  const handleContinue = () => {
    navigate('/address')
  };

  return (
    <Box className="otp-page">
      <Box className="otp-box">
        <Typography variant="h5" className="otp-heading">
          VERIFY WITH OTP
        </Typography>
        <Typography
            variant="subtitle1"
            color="textSecondary"
            className="otp-subtitle"
          >
            Sent to
          </Typography>
        <Box className="otp_content">
          <InputField
            placeholder=""
            type="number"
            className="otp_text"
          />
          <InputField
            placeholder=""
            type="number"
            className="otp_text"
          />
          <InputField
            placeholder=""
            type="number"
            className="otp_text"
          />
          <InputField
            placeholder=""
            type="number"
            className="otp_text"
          />
        

        
        </Box>
        <Button
            variant="contained"
            className="continue-button otp_button"
            onClick={handleContinue}
            fullWidth
          >
            Continue
          </Button>
      </Box>
    </Box>
  );
};

export default Otp;
