import { AppBar, Box, Button, Grid2, Toolbar, Typography } from "@mui/material";
import callImg from "../assets/call.svg";
import CONST from "../constants";
import "./Navbar.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOtpContext } from "../context/OtpContext";
import profile from '../assets/profile.svg';
function Navbar() {
  const [activeButton, setActiveButton] = useState(0); // Track the active button
  const navigate = useNavigate();
  const { otpVerified, phoneNumber } = useOtpContext();
  const handleButtonClick = (buttonIndex, path) => {
    setActiveButton(buttonIndex); // Update the active button
    if (path) navigate(path); // Navigate if a path is provided
  };

  console.log(otpVerified);
  return (
    <>
      <Grid2 container spacing={2} className="header-login">
        <Grid2
          size={{ xs: 6, md: 8 }}
          className="p-2 logo"
          onClick={() => navigate("/")}
        >
          <Typography>PRINT LOGO</Typography>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4 }} className="font-bold d-flex p-2">
          {otpVerified && (
            <>
              <img src={callImg} alt="call" />
              <span style={{ marginRight: "10px" }}>
                {phoneNumber}
              </span>
            </>
          )}
          {otpVerified ? <></> : <Button variant="contained" onClick={() => navigate("/login")}>
           <img src={profile} className="profile_img"></img> Sign up / Sign in
          </Button>}
        </Grid2>
      </Grid2>

      <AppBar
        position="static"
        elevation={0} // Removes shadow
        className="appBar"
      >
        <Toolbar>
          <Box className="appBar_toolbar">
            {CONST.menuItems &&
              CONST.menuItems.map((item, index) => (
                <Button
                  key={item.label}
                  className="appBar_button"
                  sx={{
                    backgroundColor:
                      activeButton === index ? "lightgray" : "transparent",
                  }}
                  onClick={() => handleButtonClick(index, item.path)}
                >
                  {item.label}
                </Button>
              ))}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
