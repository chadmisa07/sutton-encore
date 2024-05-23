import { Modal, Box, Button, Alert } from "@mui/material";
import React, { useState } from "react";

import { modalStyle } from "../constants";
import { sendDeleteRequest } from "../../utils";

const PersonDeleteModal = ({
  open,
  handleClose,
  doFetchDeliveryPersons,
  person,
}) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const doDelete = async () => {
    setIsSubmitting(true);
    sendDeleteRequest("delivery-person", {
      id: person.id,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        doFetchDeliveryPersons();
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
            Are you sure you want to Delete&nbsp;
            <b>
              {person.first_name} {person.last_name}
            </b>
            ?
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

export default PersonDeleteModal;
