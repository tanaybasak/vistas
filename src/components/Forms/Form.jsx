import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import "./Form.css";
import Drag from "../Drag";
import ChipItem from "../ChipItem";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useOtpContext } from "../../context/OtpContext";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../Alert";
import config from "../../config";
import { useOrderContext } from "../../context/OrderContext";

function Form({
  category_one,
  category_two,
  title,
  description,
  img,
  id,
  quantity,
  amount,
  details,
}) {
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const {  updateOrderId } = useOrderContext(); // Access orderId and update function
  const { phoneNumber, otpVerified } = useOtpContext();
  const [formData, setFormData] = useState({
    uploadedDragFile: null,
    uploadedDesignFile: null,
    categoryOne: category_one,
    categoryTwo: category_two,
    quantity: 10,
    total: 200,
  });

  console.log(id)

  
const items = details.split(',');
  const updateFormData = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleToggleSelect = (id, key) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: prevData[key].map((item) => ({
        ...item,
        selected: item.id === id,
      })),
    }));
  };

  const handleFileDrop = (files, key) => {
    const acceptedFileTypes = ["image/png", "image/jpeg", "application/pdf"];
    const validFiles = files.filter((file) =>
      acceptedFileTypes.includes(file.type)
    );

    if (validFiles.length === 0) {
      alert("Only PNG, JPEG, and PDF files are allowed.");
      return;
    }

    updateFormData(key, validFiles[0].name);
  };

  const handleAddQuantity = () => {
    updateFormData("quantity", formData.quantity + 10);
    updateFormData("total", (formData.quantity + 10) * 20);
  };

  const handleSubQuantity = () => {
    const newQuantity = Math.max(10, formData.quantity - 10);
    updateFormData("quantity", newQuantity);
    updateFormData("total", newQuantity * 20);
  };

  const handleShowAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async () => {
    const selectedCategoryOne = formData.categoryOne.find((item) => item.selected)?.name;
    const selectedCategoryTwo = formData.categoryTwo.find((item) => item.selected)?.name;
    try {
      if (otpVerified) {
        // Send both requests concurrently using Promise.all
        const brandingResponse = await axios.post(
            `${config.baseURL}/branding/saveBranding`,
            {
              itemId: id,
              itemName: title,
              description: description,
              texture: selectedCategoryOne,
              corners: selectedCategoryTwo,
              uploadDesign: formData.uploadedDragFile,
              itemImg: img,
              quantity: formData.quantity,
              amount: formData.total,
              details: details,
            }
          )
          console.log(brandingResponse);
  
        // Handle the responses
        if (brandingResponse.data) {
          updateOrderId(brandingResponse.data.itemId);
          sessionStorage.setItem('orderExecuted', true);
          handleShowAlert("Amount and Item Details are Saved", "success");
          navigate("/order", {state: {title: brandingResponse.data.title}});
        } else {
          handleShowAlert("Amount and Item Details not saved", "error");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 504) {
        // Handle 504 Gateway Timeout specifically
        handleShowAlert(
          "The server is taking too long to respond. Please try again later.",
          "error"
        );
      } else {
        // Handle other errors
        handleShowAlert("An error occurred while saving the details", "error");
      }    }
  };
  

  return (
    <Box className="form">
      <Typography className="form_heading" gutterBottom>
        {title}
      </Typography>
      <Box className="form_subtitle">
        {items.length &&
          items.map((item, index) => (
            <Typography key={index} variant="subtitle1 form_sub" gutterBottom>
              {item}
            </Typography>
          ))}
      </Box>
      <Box className="drag_design_upload">
        <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
          Upload your design:{" "}
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <Drag
              label="Drag and drop or"
              buttonlabel="Choose File"
              bgcls="drag_drop"
              buttonCls="drag_btn"
              onFileDrop={(files) => handleFileDrop(files, "uploadedDragFile")}
              uploadedFile={formData.uploadedDragFile}
              onRemoveFile={() => updateFormData("uploadedDragFile", null)}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <Drag
              label="Don't have a design"
              buttonlabel="Get a designer"
              bgcls="design"
              buttonCls="design_btn"
              onFileDrop={(files) =>
                handleFileDrop(files, "uploadedDesignFile")
              }
              uploadedFile={formData.uploadedDesignFile}
              onRemoveFile={() => updateFormData("uploadedDesignFile", null)}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4 }}></Grid2>
        </Grid2>
      </Box>
      <Box className="drag_design_upload">
        <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
          Choose Texture
        </Typography>
        <Stack className="texture chip_tags">
          {formData.categoryOne.length > 0 &&
            formData.categoryOne.map((item) => {
              return (
                <Box key={item.id}>
                  <ChipItem
                    selectedClass={item.selected ? "selected" : ""}
                    label={item.name}
                    onToggle={() => handleToggleSelect(item.id, "categoryOne")}
                  />
                </Box>
              );
            })}
        </Stack>
      </Box>
      <Box className="drag_design_upload">
        <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
          Corners
        </Typography>
        <Stack className="corners chip_tags">
          {formData.categoryTwo.length > 0 &&
            formData.categoryTwo.map((item) => (
              <Box key={item.id}>
                <ChipItem
                  selectedClass={item.selected ? "selected" : ""}
                  label={item.name}
                  onToggle={() => handleToggleSelect(item.id, "categoryTwo")}
                />
              </Box>
            ))}
        </Stack>
      </Box>
      <Box className="drag_design_upload">
        <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
          Quantity
        </Typography>
        <Stack className="quantity chip_tags">
          <Button
            variant="outlined"
            className="remove_btn"
            onClick={handleSubQuantity}
          >
            <RemoveIcon />
          </Button>
          <input type="number" className="quantity" value={formData.quantity} />
          <Button
            variant="outlined"
            className="add_btn"
            onClick={handleAddQuantity}
          >
            <AddIcon />
          </Button>
        </Stack>
      </Box>
      <Box className="drag_design_upload">
        <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
          Price
        </Typography>
        <Typography
          variant="subtitle1"
          className="price"
          fontWeight={"bold"}
          gutterBottom
        >
          &#8377;{formData.total}
        </Typography>
      </Box>
      <Box className="drag_design_upload">
        <Button
          variant="contained"
          className="print_btn"
          onClick={handleSubmit}
        >
          Print my visiting card
        </Button>
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

Form.propTypes = {
  category_one: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  category_two: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  quantity: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  details: PropTypes.string.isRequired,
};

export default Form;
