import PropTypes from "prop-types";
import { Button, IconButton } from "@mui/material";
import close from "../assets/close.svg";
import { useDropzone } from "react-dropzone";
import "./Drag.css";

function Drag({
  label,
  buttonlabel,
  buttonCls,
  bgcls,
  onFileDrop,
  uploadedFile,
  onRemoveFile,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileDrop(acceptedFiles); // Pass the files to the parent handler
      }
    },
    disabled: !!uploadedFile, // Disable dropzone functionality if file is uploaded
  });

  return (
    <div {...getRootProps()} className={`drag_content ${bgcls}`}>
      <input {...getInputProps()} />
      {uploadedFile ? (
        <div className="uploaded_file_name">
          Uploaded File: {uploadedFile}
          <IconButton
            aria-label="remove file"
            onClick={() => onRemoveFile()} // Handle file removal
            size="small"
            className="remove_file_icon"
          >
            <img src={close} alt="Close" />
          </IconButton>
        </div>
      ) : (
        <>
          <div className="drag_content_label">{label}</div>
          <br />
          <Button variant="contained" className={buttonCls}>
            {buttonlabel}
          </Button>
        </>
      )}
    </div>
  );
}

// Define prop types
Drag.propTypes = {
  label: PropTypes.string.isRequired, // Ensure `label` is a string and required
  buttonlabel: PropTypes.string.isRequired, // Ensure `buttonlabel` is a string and required
  buttonCls: PropTypes.string.isRequired, // Ensure `buttonCls` is a string and required
  bgcls: PropTypes.string.isRequired, // Ensure `bgcls` is a string and required
  onFileDrop: PropTypes.func.isRequired, // Ensure `onFileDrop` is a function and required
  uploadedFile: PropTypes.string.isRequired,
  onRemoveFile: PropTypes.func.isRequired, // Function to remove the file
};

export default Drag;
