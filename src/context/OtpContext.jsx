import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

// Create a Context for OTP verification status
const OtpContext = createContext();

// Custom hook to use OTP context
// eslint-disable-next-line react-refresh/only-export-components
export const useOtpContext = () => useContext(OtpContext);

// Provider component to wrap your app
export const OtpProvider = ({ children }) => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [phoneNumber, setPhoneNumber] = useState(""); // Add phone number state

  useEffect(() => {
    // Check sessionStorage on initial load
    const storedOtpVerified = sessionStorage.getItem("otpVerified");
    const storedPhoneNumber = sessionStorage.getItem("phoneNumber");

    if (storedOtpVerified === "true") {
      setOtpVerified(true);
    }
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
    setLoading(false);
  }, []);

  const verifyOtp = () => {
    setOtpVerified(true);
    sessionStorage.setItem("otpVerified", "true"); // Store the status in localStorage
  };

  const clearOtpVerification = () => {
    setOtpVerified(false);
    setPhoneNumber(""); // Clear phone number
    sessionStorage.removeItem("otpVerified");
    sessionStorage.removeItem("phoneNumber");
  };
  const updatePhoneNumber = (number) => {
    setPhoneNumber(number);
    sessionStorage.setItem("phoneNumber", number); // Persist phone number
  };

  return (
    <OtpContext.Provider
      value={{
        otpVerified,
        verifyOtp,
        clearOtpVerification,
        loading,
        phoneNumber,
        updatePhoneNumber,
      }}
    >
      {children}
    </OtpContext.Provider>
  );
};

OtpProvider.propTypes = {
  children: PropTypes.node,
};
