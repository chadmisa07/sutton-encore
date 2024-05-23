import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Checkbox,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

export const PACKS = [
  {
    value: "membre_vip_9_mois",
    label: "Membre VIP 9$/mois",
  },
];

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Form = ({
  submitForm,
  handleChange,
  initialState,
  success,
  error,
  routes,
  isUpdate = false,
  phoneNumberError,
  isSubmitting,
}) => {
  const {
    city,
    name,
    phone_number,
    postal_code,
    quantity,
    email,
    route_id,
    accept_sms_notification,
    accept_email_notification,
    address,
    apartment,
  } = initialState;

  const isValidPostalCode = postal_code
    ? /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(postal_code)
    : true;

  const isDisabled =
    !city ||
    !name ||
    !phone_number ||
    !postal_code ||
    !quantity ||
    !emailPattern.test(email) ||
    isSubmitting ||
    !address ||
    !accept_sms_notification ||
    !isValidPostalCode ||
    Boolean(phoneNumberError);

  return (
    <div>
      {success && (
        <div className="my-2">
          <Alert severity="success">
            <span className="font-semibold">{success}</span>
          </Alert>
        </div>
      )}

      {error && (
        <div className="my-2">
          <Alert severity="error">
            <span className="font-semibold">{error}</span>
          </Alert>
        </div>
      )}
      <div>
        <form onSubmit={submitForm}>
          <div className="my-2">
            <FormControl
              fullWidth
              className="bg-white rounded-md quantity-select-container"
            >
              <InputLabel name="quantity-label">Quantité de bagels</InputLabel>
              <Select
                labelId="quantity-label"
                name="quantity"
                label="Quantité de bagels"
                onChange={handleChange}
                value={quantity}
              >
                {PACKS.map((pack) => (
                  <MenuItem
                    key={pack.value}
                    value={pack.value}
                    className="text-[16px]"
                  >
                    {pack.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              label="Nom"
              name="name"
              color="secondary"
              onChange={handleChange}
              value={name}
              className="bg-white rounded-md"
            />
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              label="Ville"
              name="city"
              color="secondary"
              onChange={handleChange}
              value={city}
              className="bg-white rounded-md"
            />
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              label="Adresse"
              name="address"
              color="secondary"
              onChange={handleChange}
              value={address}
              placeholder="123 Main Street"
              className="bg-white rounded-md"
            />
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              label="Appartement"
              name="apartment"
              color="secondary"
              onChange={handleChange}
              value={apartment}
              className="bg-white rounded-md"
            />
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              label="Code Postal"
              name="postal_code"
              color="secondary"
              onChange={handleChange}
              value={postal_code}
              error={!isValidPostalCode}
              className="bg-white rounded-md"
              helperText={
                isValidPostalCode ? (
                  ""
                ) : (
                  <p className="-ml-3">SVP entrez un code postal valide</p>
                )
              }
            />
          </div>

          <div className="my-2 ">
            <div className="flex justify-center w-full items-center">
              <div className="max-w-11">
                <div className="flex justify-center items-center border px-3 py-[15px] border-gray-300 rounded-l-[4px] bg-gray-200">
                  {process.env.REACT_APP_DEFAULT_AREA_CODE}
                </div>
              </div>
              <TextField
                className="phone-number bg-white rounded-tr-md rounded-br-md"
                fullWidth
                label="Téléphone #"
                name="phone_number"
                color="secondary"
                onChange={handleChange}
                value={phone_number}
                error={Boolean(phoneNumberError)}
                // helperText={phoneNumberError}
              />
            </div>

            {/* {phoneNumberError && (
              <div className="text-red-500 bg-white mt-[2px] p-1 rounded-sm">
                {phoneNumberError}
              </div>
            )} */}
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              color="secondary"
              onChange={handleChange}
              value={email}
              className="bg-white rounded-md"
            />
          </div>

          {!isUpdate && (
            <>
              <div className="bg-white rounded-md mb-2 p-1">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={accept_sms_notification}
                      onChange={handleChange}
                      color="primary" // You can change the color to 'secondary' or 'default'
                      name="accept_sms_notification"
                    />
                  }
                  label="J'accepte de recevoir des alertes de livraisons par texto"
                />
              </div>
              <div className="mb-4 bg-white rounded-md p-1">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={accept_email_notification}
                      onChange={handleChange}
                      color="primary" // You can change the color to 'secondary' or 'default'
                      name="accept_email_notification"
                    />
                  }
                  label="J'accepte de recevoir des infolettres occasionnels par courriel"
                />
              </div>
            </>
          )}

          {isUpdate ? (
            <>
              <div className="mt-2 mb-4">
                <FormControl fullWidth className="bg-white rounded-md">
                  <InputLabel name="quantity-label">Itinéraire</InputLabel>
                  <Select
                    labelId="route-label"
                    name="route_id"
                    label="route"
                    onChange={handleChange}
                    value={route_id}
                  >
                    {routes.map((route) => (
                      <MenuItem key={route.id} value={route.id}>
                        {route.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </>
          ) : null}
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              disabled={isDisabled}
              className="!normal-case"
            >
              {isUpdate ? "Mise à jour" : "M'abonner"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
