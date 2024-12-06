import { Box, Typography } from "@mui/material";
import "./Card.css";
import { useNavigate } from "react-router-dom";
function CardBrand() {
  const navigate = useNavigate();
  const handleItemClick = () => {
      navigate('/branding/details');
  }
  return (
    <Box className="card" onClick={handleItemClick}>
      <img
        src="https://via.placeholder.com/300x200"
        alt="Card"
        className="card_img"
      />
      <Box sx={{ marginTop: 2 }} className="card_text">
        <Typography
          variant="body1"
          fontWeight={"bold"}
          noWrap
          sx={{ border: "none" }}
          className="card_title"
        >
          VISITING CARD
        </Typography>
        <Typography variant="body2" noWrap sx={{ border: "none" }} className="card_subtitle">
          This is the text at the bottom of the card.
        </Typography>
      </Box>
    </Box>
  );
}

export default CardBrand;
