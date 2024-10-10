// GuestSection.js
import React from "react";

const GuestSection = () => {
  return (
    <div className="bg-black ">
     <p className="text-4xl text-white text-center  -mb-[20%] md:-mb-[5%] font-mono">Digital Creator</p>
    <div className=" bg-black flex justify-center items-center min-h-screen">
      <div className="bg-black max-w-sm w-full shadow-lg rounded-lg py-3 px-6">
        <div className="text-center mb-4">
          <img
            className="w-[100%] h-[10%] sm:h-[20%] rounded-[20px] mx-auto"
            src="https://yt3.googleusercontent.com/ytc/AIdro_nKuARp-kgK0_dDX3TE4jOe2B7U_hnGTz0UdZTtagMu4A=s900-c-k-c0x00ffffff-no-rj" // Replace with guest's image
            alt="Guest"
          />
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-white font-mono">Funyassi</h2>
        </div>
       
        <div className="mt-3">

          <a href='https://www.youtube.com/@Funyaasi/videos' >
            <img src="/Events/icons8-youtube.svg" className="mx-auto"/>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GuestSection;
