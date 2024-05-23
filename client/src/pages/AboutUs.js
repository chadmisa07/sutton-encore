import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <div className="flex flex-col md:flex-row">
        <iframe
          className="w-full h-[90vh]"
          title="About Us"
          src="https://docs.google.com/document/d/e/2PACX-1vS3wXWvATHhMCgJqFMAY9dasu2t2oxYQT0Fj3oMO0JjcCR7dqqZMRmarBgD3pbjdQhkgCJbcxRi552-/pub?embedded=true"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutUs;
