"use client";
import Image from "next/image";
import React, { useState } from "react";

const inputClasses =
  "mt-1 block w-full border-b border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500";

const formFields = [
  { placeholder: "Name", type: "text", name: "name" },
  { placeholder: "Email", type: "email", name: "email" },
  { placeholder: "Phone Number", type: "tel", name: "phone" },
  { placeholder: "Message", type: "textarea", name: "message" },
];

const selectOptions = ["Channel Partner", "Buyer"];

const QueryForm = ({ onClose }) => {
  const [selected, setSelected] = useState("Select Qualification");
  const [open, setOpen] = useState(false);

  return (
    <div
      className="absolute inset-0 z-[99999] bg-black/40 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-[80%] sm:max-w-[60%] flex mx-auto relative bg-white">
        {/* Left side image (desktop only) */}
        <div className="hidden sm:block w-1/2 h-[65vh] relative">
          <Image
            src="/images/forming.jpg"
            alt="Contact form illustration"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right side form */}
        <div className="relative bg-white w-full sm:w-[60%] h-[65vh] p-5 sm:p-14 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close form"
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl cursor-pointer"
          >
            ✕
          </button>

          {/* Heading */}
          <h2 className="text-lg sm:text-2xl font-semibold mb-6 text-gray-700 uppercase tracking-wide">
            Have questions? <br /> Ask away!
          </h2>

          {/* Form */}
          <form className="space-y-3 tracking-wider roboto_font">
            {/* Mapped input fields */}
            {formFields.map((field) => (
              <div key={field.name}>
                {field.type === "textarea" ? (
                  <textarea
                    rows={1}
                    required
                    placeholder={field.placeholder}
                    className={inputClasses}
                  />
                ) : (
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    className={inputClasses}
                  />
                )}
              </div>
            ))}

            {/* Custom Select Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`${inputClasses} text-left bg-transparent text-gray-600`}
              >
                {selected}
              </button>

              {open && (
                <ul className="absolute left-0 right-0 mt-1 border border-gray-300 bg-white shadow-md rounded-md z-10">
                  {selectOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-gray-600"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-transparent border border-black uppercase 
                         text-black tracking-[2px] py-2 px-10 mt-5 sm:mt-6
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
