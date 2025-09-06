import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const Navbar = ({ showScene1 }) => {
  return (
    <header className="w-full absolute top-0 left-0 h-[10vh] px-5 sm:px-10 py-5 z-10 bg-transparent">
      <div className="flex justify-between items-top md:items-center">
        <div className="logo inline-block w-[60%] sm:w-auto">
          <img src="/images/logo.webp" alt="" className="w-[60%] sm:w-[80%]" />
        </div>

        <div className="rera_sec flex justify-end items-center">
          {/* <div className="flex items-center justify-between gap-[1px] sm:gap-1 md:gap-2"> */}
            <div
  className={`rera_details text-[12px] md:text-[18px] font-[100]  
  ${showScene1 ? "text-black" : "text-white"}
  flex gap-2 items-center tracking-wider transition-colors duration-500`}
>
  <FaLocationDot className="sm:mt-[5px] mb-1 sm:mb-2" />
  <div className="text-[12px] md:text-[16px] bottom_text uppercase whitespace-nowrap flex-shrink-0">
    sector 107 noida
  </div>
</div>

            {/* <div className="qr block">
              <img src="/images/qrcode.png" alt="qr" className="w-10 h-auto " />
            </div> */}
          </div>
        {/* </div> */}
      </div>
    </header>
  );
};

export default Navbar;