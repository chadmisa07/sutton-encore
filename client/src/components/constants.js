import Customer from "./admin/Customer";
import BroadcastSMS from "./admin/BroadcastSMS";

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

export const PAGES = Object.freeze([
  {
    link: "customer",
    label: "Customer",
    component: Customer,
  },
  {
    link: "broadcast",
    label: "Broadcast",
    component: BroadcastSMS,
  },
]);
