import React, { useState } from "react";
import isEqual from "lodash.isequal";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { sendPatchRequest, sendPostRequest } from "../../utils";
import Modal from "../Modal";

const UserUpdateModal = ({
  open,
  handleClose,
  initialState,
  deliveryDays,
  deliveryPersons,
  submitCallback,
}) => {
  const [state, setState] = useState({
    ...initialState,
  });

  const { delivery_person_id, delivery_day, km, name } = state;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setState((values) => ({ ...values, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (initialState?.id) {
      sendPatchRequest("routes", { ...state }).then(() => {
        submitCallback();
        setIsSubmitting(false);
      });
    } else {
      sendPostRequest("routes", { ...state }).then(() => {
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
            label="Name"
            name="name"
            color="secondary"
            onChange={handleChange}
            value={name}
          />
        </div>

        <div className="my-3">
          <FormControl fullWidth>
            <InputLabel name="delivery-day">Delivery Day</InputLabel>
            <Select
              labelId="delivery-day"
              name="delivery_day"
              label="Delivery Day"
              onChange={handleChange}
              value={delivery_day}
            >
              {deliveryDays.map((day) => (
                <MenuItem key={day.id} value={day.id}>
                  {day.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="my-3">
          <FormControl fullWidth>
            <InputLabel name="delivery-person">Delivery Person</InputLabel>
            <Select
              labelId="delivery-person"
              name="delivery_person_id"
              label="Delivery Person"
              onChange={handleChange}
              value={delivery_person_id}
            >
              {deliveryPersons.map((person) => (
                <MenuItem key={person.id} value={person.id}>
                  {person.first_name} {person.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="my-3">
          <TextField
            fullWidth
            label="Distance"
            name="km"
            color="secondary"
            onChange={handleChange}
            value={km}
            type="number"
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="contained"
            disabled={
              !delivery_person_id ||
              !delivery_day ||
              !km ||
              !name ||
              isSubmitting ||
              isEqual(initialState, state)
            }
          >
            {initialState?.id ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserUpdateModal;
