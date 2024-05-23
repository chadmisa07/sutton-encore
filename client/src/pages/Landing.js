import React from "react";
import { Routes, Route } from "react-router-dom";

import Subscribe from "./Subscribe";
import ContactUs from "./ContactUs";
import PrivacyPolicy from "./PrivacyPolicy";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="main-container overflow-hidden">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/" element={<Subscribe />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
