import React from "react";
import { Spotlight } from "./ui/Spotlight";
import Image from "next/image";
import Link from "next/link";
export function SpotlightPreview(eventData) {
  const { id, name, description, image } = eventData['eventsData'];
  // Decode the name to remove %20 and other encoded characters
  console.log(image)
  const decodedName = decodeURIComponent(name);
  return (
    (<div
      className="h-[120vh] sm:h-[130vh] md:h-[140vh] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className=" max-w-5xl  mx-auto relative z-10 border-[3px]   border-white rounded-[20px]  w-full mt-[35%] sm:mt-[10px] pt-3 md:pt-3 mx-[10%] ">
        <div className="flex items-center justify-center  ">
        <h1
          className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          {decodedName} 
        </h1>
        </div>
        <div className=" flex flex-col md:flex-row items-center justify-evenly">
          <div>
        <p
          className="p-4 text-left mt-4 font-normal text-[25px] md:text-[25px] text-base text-neutral-300 max-w-lg ">
          {description}
        </p>
        <a href='https://docs.google.com/document/d/1vtWbd09r5kkVDr9IZJecpsS6v2mQ9G7Ylp5NqhOJDUc/edit?usp=sharing' className="bg-blue-600 text-white text-[25px] mx-[30%] rounded-[10px] border-[2px] border-white px-[4%] w-[30%]">Rulebook</a>
        </div>
        <div className="max-h-full max-w-full ">
        <Image  className="h-[200px] w-[300px]  rounded-md object-cover sm:h-[400px] sm:w-[400px]" 
              alt="Event Image"
              // layout="fill"
              width={200}  // Set desired width
              height={300} // Set desired height
              // objectFit="contain" // Maintains image quality 
              src={image}  />
        </div>
        </div>
      </div>
    </div>)
  );
}
