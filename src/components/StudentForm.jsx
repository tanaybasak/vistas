import { Box, Button } from "@mui/material";
import whatsapp from "../assets/whatsapp.svg";
import "./StudentForm.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AlertComponent from "./Alert";
import axios from "axios";
import config from "../config";
function StudentForm({ type }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    description: "",
    type: type,
  });

  const validateForm = () => {
    const { name, number, email, description } = formData;
    const isValid =
      name.trim() !== "" &&
      number.trim() !== "" &&
      email.trim() !== "" &&
      description.trim() !== "";
    setIsButtonDisabled(!isValid);
  };
  const handleShowAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        `${config.baseURL}/enquiry/createEnquiry`,
        {
          name: formData.name,
          email: formData.email,
          description: formData.description,
          number: formData.number,
          type: formData.type,
        }
      );
      if (response.data.success) {
        handleShowAlert("Enquiry Registered", "success");
        setFormData({
          name: "",
          number: "",
          email: "",
          description: "",
          type: type,
        });
      }
    } catch (error) {
      handleShowAlert("Enquiry Not Registered", "error");
    }
    // Add your form submission logic here (e.g., API call)
  };

  // Handle input changes
  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <Box className="student_form_container">
      <Box className="student_heading">
        Whatever your printing requirements are, <br /> we will get it done and
        delivered to you.
      </Box>
      <Box className="assignment_container">
        <Box className="item" textAlign={"right"}>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              onSubmit(); // Call your custom submit function
            }}
          >
            <input
              type="text"
              className="assignment_textField"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
            <input
              type="number"
              className="assignment_textField"
              value={formData.number}
              name="number"
              onChange={handleInputChange}
              placeholder="Enter your number"
              required
            />

            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              className="assignment_textField"
              placeholder="Enter your email"
              required
            />

            <input
              type="text"
              value={formData.description}
              name="description"
              onChange={handleInputChange}
              className="assignment_textField"
              placeholder="Enter your description"
              required
            />
            <Button
              variant="contained"
              className="submit_btn"
              type="submit"
              disabled={isButtonDisabled}
            >
              Submit
            </Button>
          </form>
        </Box>
        <Box className="item seperator" fontWeight={"bold"}>
          -Or-
        </Box>
        <Box className="item whatsapp_updates" textAlign={"center"}>
          <Box>WhatsApp us your requirements</Box>
          <img src={whatsapp} alt="whatsapp" />
        </Box>
      </Box>
      <AlertComponent
        message={alertMessage}
        severity={alertSeverity}
        open={alertOpen}
        onClose={handleCloseAlert}
      />
    </Box>
  );
}

StudentForm.propTypes = {
  type: PropTypes.string,
};

export default StudentForm;
