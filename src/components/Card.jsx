import { Box, Typography } from "@mui/material";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
function CardBrand({ title, description, img, id, quantity, amount, details }) {
  const navigate = useNavigate();
  const handleItemClick = () => {
    const props = {
      title, description, img, quantity, amount, details, id
    }
    console.log(id)
    navigate(`/branding/details/${id}`, { state: props });
  }
  return (
    <Box className="card" onClick={handleItemClick}>
      <img
        src={img}
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
          {title}
        </Typography>
        <Typography variant="body2" noWrap sx={{ border: "none" }} className="card_subtitle">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

CardBrand.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  details: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired
}
export default CardBrand;
