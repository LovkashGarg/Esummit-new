// GuestSection.js
import React from "react";

const GuestSection = () => {
  return (
    <div className="bg-black ">
     <p className="text-4xl text-white text-center  mt-6 -mb-6 md:-mb-20 font-mono">Youtuber</p>
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
        <div className="mt-4">
          <p className="text-yellow-600 text-3xl  text-center font-mono">
          5.13 M subscribers.
          </p>
        </div>
        <div className="mt-3 text-center">
          <a href='https://www.youtube.com/@Funyaasi/videos' className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-blue-600 transition-colors">
            Youtube
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GuestSection;
