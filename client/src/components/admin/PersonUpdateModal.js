import React, { useState } from "react";
import isEqual from "lodash.isequal";

import { TextField, Button } from "@mui/material";
import { sendPatchRequest, sendPostRequest } from "../../utils";
import Modal from "../Modal";

const UserUpdateModal = ({
  open,
  handleClose,
  initialState,
  submitCallback,
}) => {
  const [state, setState] = useState({
    ...initialState,
  });

  const { first_name, last_name } = state;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setState((values) => ({ ...values, [name]: value }));
  };

  const submitForm = (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    if (initialState?.id) {
      sendPatchRequest("delivery-person", { ...state })
        .then((res) => {
          res.json();
        })
        .then((res) => {
          submitCallback();
          setIsSubmitting(false);
        });
    } else {
      sendPostRequest("delivery-person", { ...state })
        .then((res) => res.json())
        .then((res) => {
          submitCallback();
          setIsSubmitting(false);
        });
    }
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <form onSubmit={submitForm}>
        <div className="my-3">
          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            color="secondary"
            onChange={handleChange}
            value={first_name}
          />
        </div>

        <div className="my-3">
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            color="secondary"
            onChange={handleChange}
            value={last_name}
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || isEqual(initialState, state)}
          >
            {initialState?.id ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserUpdateModal;
