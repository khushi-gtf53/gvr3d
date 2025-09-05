"use client";
import Image from "next/image";
import React, { useState } from "react";

const inputClasses =
    "mt-1 block w-full border-b border-gray-300 py-2 text-gray-400 placeholder-gray-400 focus:outline-none focus:border-gray-500";

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

    const isPlaceholder = selected === "Select Qualification";

    return (
        <div
            className="absolute inset-0 z-[99999] bg-black/40 flex justify-center items-center"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-full max-w-[90%] md:max-w-[40%] flex flex-col mx-auto relative bg-white">
                {/* Left side image (desktop only) */}
                <div className="top relative">
                     {/* Close Button */}
                    <button
                        onClick={onClose}
                        aria-label="Close form"
                        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-white text-white text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                
                <div className="block h-[100px]  md:h-[20vh] relative">
                    <Image
                        src="/images/forming.jpg"
                        alt="Contact form illustration"
                        fill
                        className="object-cover border-t-2 border-[#26382b]"
                        priority
                    />
                </div>
                </div>

                {/* Right side form */}
                <div className="relative bg-white h-auto p-5 sm:p-10 ">
                    {/* <div className="relative w-full">
                    <button
                        onClick={onClose}
                        aria-label="Close form"
                        className="relative top-1  block sm:hidden right-[4px] z-20 w-8 h-8 rounded-full border border-black text-black text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                    </div> */}

                    {/* Heading */}
                    <h2 className="text-lg sm:text-xl text-center font-semibold mb-3 md:mb-6 text-gray-700 uppercase tracking-wide">
                        Have questions? Ask away!
                    </h2>

                    {/* Form */}
                  <form className="space-y-3 tracking-wider roboto_font ">
  <div className="grid grid-cols-12 gap-2 md:gap-5">
    {/* Name, Email, Phone fields */}
    {formFields
      .filter((field) => field.name !== "message")
      .map((field) => (
        <div key={field.name} className="col-span-12 md:col-span-6">
          {field.type === "textarea" ? (
            <textarea
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

    {/* Qualification dropdown */}
    <div className="relative col-span-12 md:col-span-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${inputClasses} text-left bg-transparent ${
          isPlaceholder ? "text-gray-400" : "text-gray-400"
        }`}
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
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                option === selected
                  ? "text-gray-400 font-medium"
                  : "text-gray-400"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Message field last */}
    <div className="col-span-12 md:col-span-6">
      <textarea
        rows={1}
        required
        placeholder="Message"
        className={inputClasses}
      />
    </div>
  </div>

  {/* Submit button */}
  <div className="w-full flex justify-center items-center">
    <button
      type="submit"
      className="bg-transparent border border-black uppercase 
                 text-black tracking-[2px] py-1 px-12 mt-5 sm:mt-6
                 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Submit
    </button>
  </div>
</form>

                </div>
            </div>
        </div>
    );
};

export default QueryForm;
