import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div class="bg-[#232323] p-4">
      <div class="container mx-auto flex justify-between items-center sm:flex-row flex-col">
        <div>
          <span className="text-sm text-white">
            &copy; Copyright 2024, Les Productions Sutton Encore
          </span>
        </div>
        <div className="flex justify-center">
          <span className="text-sm text-white cursor-pointer">
            <Link to="/privacy-policy">Politique de vie Privée</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
