import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {

  const navigate = useNavigate()
  return (
    <section className="bg-[#1F1E24]  flex items-center justify-center min-w-screen mx-auto">
      <div className=" w-full max-w-lg   shadow-lg rounded-lg">
        <div className="text-center mb-8 ">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">Contact Us</h1>
          <p className="text-gray-200 text-lg">
            Have any questions, feedback, or inquiries? Reach out to us using
            the details below. We’re here to help!
          </p>
        </div>
        <button onClick={() => { navigate(-1) }} className="mb-4 w-full bg-[#6556cd]
         text-white px-4 py-2 rounded hover:bg-violet-800 transition duration-200">
          Go Back
        </button>
        <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-700 text-lg">
              We're always happy to assist you! You can contact us via phone or
              email, and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
            <p className="text-blue-500 text-lg mt-2">+91 12345 67890</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Email</h3>
            <p className="text-blue-500 text-lg mt-2">
              contact@streamingapp.com
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Office Address
            </h3>
            <p className="text-gray-800 text-lg mt-2">
              123, Movie Avenue, Film City, Mumbai, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
