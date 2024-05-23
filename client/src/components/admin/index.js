import React from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "./Layout";
import Customers from "./Customer";
import { PAGES } from "../constants";

const AdminPage = (props) => {
  const params = useParams();

  const Comp = params?.adminSection
    ? PAGES.find((page) => page.link === params?.adminSection).component
    : Customers;

  return (
    <div>
      <DashboardLayout props={props}>
        <Comp />
      </DashboardLayout>
    </div>
  );
};

export default AdminPage;
