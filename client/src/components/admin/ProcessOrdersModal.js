import { Modal, Box, Button, Alert } from "@mui/material";
import React, { useState } from "react";

import { modalStyle } from "../constants";
import { sendPostRequest } from "../../utils";

const ProcessOrdersModal = ({ open, handleClose, doFetchRoutes, route }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const doDelete = async () => {
    setIsSubmitting(true);
    sendPostRequest("routes-status-reset", {
      id: route.id,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        doFetchRoutes();
        if (data.errMessage) setError(data.errMessage);
        if (data.message) {
          handleClose();
        }
      });
  };

  return (
    <Modal open={open} onClose={handleClose} className="relative">
      <Box sx={modalStyle}>
        {error ? (
          <div className="my-4">
            <Alert severity="error">{error}</Alert>
          </div>
        ) : null}

        <div className="my-6">
          <p>
            <Alert severity="error">
              This action is cannot be <b>reverted</b>.
            </Alert>
            <br />
            Please print delivery list before performing this action.
            <br />
            <br />
            Proceed updating status for <b>{route.name}</b>?
            <br />
            <br />
          </p>
        </div>
        <div className="flex justify-center">
          <Button type="submit" variant="contained" onClick={doDelete}>
            Yes
          </Button>
          <span className="ml-2">
            <Button
              type="submit"
              variant="outlined"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </span>
        </div>
      </Box>
    </Modal>
  );
};

export default ProcessOrdersModal;
