import React from "react";

const Navbar = ({ showScene1 }) => {
  return (
    <header className="w-full absolute top-0 left-0 h-[10vh] px-5 sm:px-10 py-5 z-10 bg-transparent">
      <div className="flex justify-between items-center">
        <div className="logo">
          <img src="/images/logo.webp" alt="" className="w-[60%] sm:w-[80%]" />
        </div>

        <div className="rera_sec">
          <div className="flex gap-2">
            <div
              className={`rera_details text-[7px] font-[100] ${
                showScene1 ? "text-black" : "text-white"
              } flex flex-col items-end tracking-wider roboto_font transition-colors duration-500`}
            >
              <p>RERA NUMBER: UPRERAPRJ510056/09/2025</p>
              <p>HTTPS://WWW.UP-RERA.IN</p>
              <p>ACCOUNT NUMBER: 7865002900000018 | IFSC: PUNB0786500</p>
              <p>BANK & BRANCH ADDRESS: PNB, SECTOR 104, NOIDA, UP</p>
              <p>LAUNCH DATE OF PROJECT: 11-06-2025</p>
            </div>
            <div className="qr">
              <img src="/images/qrcode.png" alt="qr" className="w-14 h-14" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
