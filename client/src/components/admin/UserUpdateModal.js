import React, { useState } from "react";

import Form from "../Form";
import { sendPostRequest, formatPhoneNumber } from "../../utils";
import Modal from "../Modal";

const UserUpdateModal = ({
  open,
  handleClose,
  user,
  routes,
  doFetchCustomers,
}) => {
  const phone_number = user.phone_number.replace(
    new RegExp(`^\\${process.env.REACT_APP_DEFAULT_AREA_CODE}`),
    ""
  );

  const [inputs, setInputs] = useState({
    ...user,
    phone_number,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "phone_number" && value && !/^[0-9]+$/.test(value)) return;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    sendPostRequest("update-subscriber", {
      ...inputs,
      phone_number: formatPhoneNumber(inputs.phone_number),
    })
      .then((res) => res.json())
      .then((data) => {
        doFetchCustomers();
        if (data?.errMessage) {
          setError(data.errMessage);
        } else {
          doFetchCustomers();
          handleClose();
        }
      });
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <div>
        <Form
          submitForm={submitForm}
          handleChange={handleChange}
          initialState={inputs}
          error={error}
          isSuccess={false}
          routes={routes}
          isSubmitting={isSubmitting}
          isUpdate
        />
      </div>
    </Modal>
  );
};

export default UserUpdateModal;
