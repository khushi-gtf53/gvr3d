import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const Navbar = ({ showScene1 }) => {
  return (
    <header className="w-full absolute top-0 left-0 h-[10vh] px-5 sm:px-10 py-5 z-10 bg-transparent">
      <div className="flex justify-between items-top md:items-center">
        <div className="logo">
          <img src="/images/logo.webp" alt="" className="w-[70%] sm:w-[80%]" />
        </div>

        <div className="rera_sec">
          <div className="flex  items-top items-center  gap-[1px] sm:gap-1 md:gap-2">
            <div
              className={`rera_details text-[12px] md:text-[18px] font-[100]  ${
                showScene1 ? "text-black" : "text-white"
              } flex sm:items-center tracking-wider  transition-colors duration-500`}
            >
            <FaLocationDot className="mt-[5px] mx-[12px] sm:mb-2 "/>
            <div className="text-[11px] md:text-[16px] md:px-[0] bottom_text uppercase tracking-wider w-full sm:text-xl  flex flex-col justify-start items-center gap-2">
            sector 107 noida
                    </div>
              {/* <p className="text-end md:text-start">RERA NUMBER: UPRERAPRJ510056/09/2025</p>
              <p className="text-end  md:text-start">HTTPS://WWW.UP-RERA.IN</p>
              <p className="text-end  md:text-start">ACCOUNT NUMBER: 7865002900000018 | IFSC: PUNB0786500</p>
              <p className="text-end  md:text-start">BANK & BRANCH ADDRESS: PNB, SECTOR 104, NOIDA, UP</p>
              <p className="text-end  md:text-start">LAUNCH DATE OF PROJECT: 11-06-2025</p> */}
            </div>
            <div className="qr block">
              <img src="/images/qrcode.png" alt="qr" className="w-10 h-auto " />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;