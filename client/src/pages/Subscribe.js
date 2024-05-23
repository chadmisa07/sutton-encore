import React, { useState } from "react";

import UnsubscribeModal from "../components/UnsubscribeModal";
import Form from "../components/Form";
import { sendPostRequest, formatPhoneNumber } from "../utils";

const Subscribe = () => {
  const [inputs, setInputs] = useState({
    city: "",
    name: "",
    phone_number: "",
    postal_code: "",
    quantity: "",
    email: "",
    address: "",
    number: "",
    apartment: "",
    accept_sms_notification: false,
    accept_email_notification: false,
  });
  const [error, setError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const doShowUnsubscribeModal = (value) => {
    setShowUnsubscribeModal(value);
  };

  console.log("@@@@@@@@@@@@@@@@@@@ inputs >>>>>>>>>>>>>>>", inputs);

  const { quantity } = inputs;

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      name === "accept_sms_notification" || name === "accept_email_notification"
        ? event.target.checked
        : event.target.value;

    console.log(
      "@@@@@@@@@@@@@@@@ test >>>>>>>>>>>>",
      /^\d{10}$/.test(Number(value))
    );

    if (name === "phone_number") {
      if (value && !/^[0-9]+$/.test(value)) return;
      if (!/^\d{10}$/.test(Number(value)) && !phoneNumberError) {
        setPhoneNumberError("Numéro de téléphone invalide");
      } else if (/^\d{10}$/.test(Number(value)) && phoneNumberError) {
        setPhoneNumberError("");
      }
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  console.log(
    "@@@@@@@@@@@@@@@@@@ phoneNumberError >>>>>>>>>>>>>",
    phoneNumberError
  );

  const doCheckOut = async (userId) => {
    const res = await sendPostRequest("create-checkout-session", {
      lookup_key: String(quantity),
      user_info: {
        ...inputs,
        phone_number: formatPhoneNumber(inputs.phone_number),
      },
      userId,
    });

    const body = await res.json();
    if (body?.url) {
      window.location.href = body.url;
    }

    if (body?.errMessage) setError(body.errMessage);
  };

  const submitForm = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    sendPostRequest("subscribe", {
      ...inputs,
      phone_number: formatPhoneNumber(inputs.phone_number),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.userId) doCheckOut(data.userId);
        if (data?.errMessage) setError(data.errMessage);
      });
  };

  return (
    <>
      {showUnsubscribeModal ? (
        <UnsubscribeModal
          open={showUnsubscribeModal}
          handleClose={() => doShowUnsubscribeModal(false)}
        />
      ) : null}

      <div
        className="relative overflow-y-auto p-10 bg-[#232323] min-h-screen flex justify-center flex-col bg-contain sm:bg-cover bg-repeat sm:bg-no-repeat"
        style={{
          backgroundImage: "url('/crowd_bg.jpg')",
        }}
      >
        <div>
          <div className="bagels__container bg-transparent lg:max-w-4xl xl:max-w-5xl md:max-w-3xl md:mx-auto md:w-1/2 w-full flex flex-col">
            <div className="bagels-form lg:px-14 pb-6">
              <div className="flex items-center flex-col bg-white p-3 rounded-md call-to-action-container mb-7">
                <h1 className="font-semibold text-xl sm:text-3xl text-center">
                  Devenez membre VIP de Sutton Encore, profitez des avantages et
                  appuyez votre salle!
                </h1>
              </div>

              <Form
                submitForm={submitForm}
                handleChange={handleChange}
                isSubmitting={isSubmitting}
                initialState={inputs}
                error={error}
                phoneNumberError={phoneNumberError}
              />
            </div>
            <div className="flex my-4 justify-between sm:flex-row flex-col">
              <div className="flex justify-center">
                <span
                  className="text-sm text-white cursor-pointer"
                  onClick={() => doShowUnsubscribeModal(true)}
                >
                  Souhaitez-vous vous&nbsp;
                  <span className="cursor-pointer font-semibold">
                    désabonner
                  </span>
                  ?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
