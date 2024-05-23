import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Joignez-nous</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-xl font-semibold mb-2">Téléphone #</h2>
          <p className="mb-4">+1 450 538-0486</p>
          <h2 className="text-xl font-semibold mb-2">Adresse</h2>
          <p className="mb-4">4c Rue Maple, Sutton, QC J0E 2K0</p>
          <h2 className="text-xl font-semibold mb-2">
            Emplacement sur la carte Google
          </h2>
          <iframe
            title="Emplacement sur la carte Google"
            className="w-full h-64 mb-4"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.9473414578038!2d-72.61749598923501!3d45.107135470949615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb61e7c65b40629%3A0xebc47f395cd5cae1!2s4c%20Rue%20Maple%2C%20Sutton%2C%20QC%20J0E%202K0%2C%20Canada!5e0!3m2!1sen!2sph!4v1716364653833!5m2!1sen!2sph"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-xl font-semibold mb-2">Médias sociaux</h2>
          <p className="mb-4">
            Instagram:{" "}
            <a
              href="https://www.instagram.com/sutton_encore/"
              target="blank"
              re="noopener noreferrer"
              className="text-blue-600"
            >
              @sutton_encore
            </a>
          </p>

          <p className="mb-4">
            Facebook:{" "}
            <a
              href="https://www.facebook.com/suttonencore/"
              target="blank"
              re="noopener noreferrer"
              className="text-blue-600"
            >
              Sutton Encore
            </a>
          </p>
          {/* You can add social media icons/links here */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
