import React from "react";
import { Spotlight } from "./ui/Spotlight";
import Image from "next/image";
export function SpotlightPreview(eventData) {
  const { id, name, description, image } = eventData['eventsData'];
  // Decode the name to remove %20 and other encoded characters
  const decodedName = decodeURIComponent(name);
  return (
    (<div
      className="h-[120vh] sm:h-[130vh] md:h-[150vh] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className=" max-w-5xl  mx-auto relative z-10 border-[3px]   border-white rounded-[20px]  w-full mt-[10%] sm:mt-[0%] pt-20 md:pt-10 mx-[10%] ">
        <div className="flex items-center justify-center  ">
        <h1
          className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          {decodedName} 
        </h1>
        </div>
        <div className=" flex flex-col md:flex-row items-center justify-evenly">
        <p
          className="p-4 mt-4 font-normal text-[20px] md:text-[25px] text-base text-neutral-300 max-w-lg text-center">
          {description}
        </p>
        <div className="max-h-full max-w-full ">
        <img  className="h-[200px] w-[300px] sm:h-[400px] sm:w-[400px]" src={image} alt="Breaking Convention" />
        </div>
        </div>
      </div>
    </div>)
  );
}
