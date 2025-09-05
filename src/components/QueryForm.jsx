"use client";
import React from "react";

const QueryForm = ({ onClose }) => {
  return (
    <div className="absolute inset-0 z-[99999] bg-black/40  flex justify-center items-center">
      <div className="w-full max-w-[80%] sm:max-w-[60%] flex mx-auto relative bg-white">
        <img src="/images/forming.jpg" alt="" className="w-[50%] hidden sm:block h-[64vh] object-cover bg-white" />

        <div className="relative bg-white w-full sm:w-[60%] h-[64vh] p-[20px] sm:p-[60px] ">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* Heading */}
          <h2 className="text-[16px] sm:text-2xl font-semibold mb-6 text-gray-700 uppercase tracking-wide">
            Have questions? <br /> Ask away!
          </h2>

          {/* Form */}
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full  border-b border-gray-300   
                         text-gray-900 focus:outline-0"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full  border-b border-gray-300   
                         text-gray-900 focus:outline-0"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="mt-1 block w-full  border-b border-gray-300   
                         text-gray-900 focus:outline-0"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Message
              </label>
              <textarea
                required
                rows={1}
                className="mt-1 block w-full  border-b border-gray-300   
                         text-gray-900 focus:outline-0"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              className="bg-gradient-to-r mt-3 sm:mt-6 cursor-pointer border border-black uppercase  
                       bg-transparent text-black mb-20 tracking-[2px] py-[8px] px-[40px] 
                       transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
