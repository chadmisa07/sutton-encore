import React from "react";
import { Modal as MUIModal, Box } from "@mui/material";

import { modalStyle } from "./constants";

const Modal = ({ open, handleClose, children }) => {
  return (
    <MUIModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} className="relative max-h-screen overflow-y-auto">
        {children}
      </Box>
    </MUIModal>
  );
};

export default Modal;
