import PropTypes from "prop-types";
import "./ChipItem.css";
import { Chip } from "@mui/material";
function ChipItem({ selectedClass, label, onToggle }) {
  
  return (
    <Chip
    label={label}
    className={`chip ${selectedClass}`}
    variant="outlined"
    onClick={onToggle}
    />
  );
}

ChipItem.propTypes = {
  label: PropTypes.string.isRequired,
  selectedClass: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired

};

export default ChipItem;
