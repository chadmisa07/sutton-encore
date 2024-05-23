import React, { useState } from "react";
import Alert from "../Alert";
import { Button } from "@mui/material";
import { sendPostRequest } from "../../utils";

const DEFAULT_STATE = { route: "0", message: "", isUpdateStatus: false };

function Form() {
  const [inputs, setInputs] = useState(DEFAULT_STATE);
  const { route, message } = inputs;
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;

    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true);
    sendPostRequest("broadcast-sms", inputs)
      .then((res) => res.json())
      .then((data) => {
        setInputs(DEFAULT_STATE);

        setLoading(false);
        if (data.errMessage) {
          return setError(data.errMessage);
        }

        setSuccess(data.message);
      })
      .catch((err) => setError(JSON.stringify(err)));
  };

  return (
    <div>
      <div className="p-2 shadow-lg border rounded-md pb-6">
        <div className="text-3xl p-2">Broastcast</div>
        <hr className="mt-2" />
        <div className="mt-14 flex justify-center items-center">
          <div className="max-w-lg w-full">
            <Alert
              success={success}
              error={error}
              loading={loading ? "Broadcasting message to customers." : ""}
            />
            <div className="w-full flex mt-2">
              <textarea
                className="w-full border border-gray-300 p-3 text-gray-600 h-48 shadow-sm rounded-sm focus:outline-none"
                cols="10"
                name="message"
                onChange={handleChange}
                placeholder="Enter a message"
                value={message}
              ></textarea>
            </div>

            <div className="w-full flex mt-2 justify-end">
              <Button
                variant="contained"
                className="py-1 px-3 rounded-sm shadow-sm text-white"
                onClick={submitForm}
                disabled={!route || !message}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
