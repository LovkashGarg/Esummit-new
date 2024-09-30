
import React from "react";
import { Spotlight } from "./ui/Spotlight";
import Image from "next/image";

export function SpotlightPreview(eventData) {
  const { id, name, description, image,TeamSize,Prize } = eventData['eventsData'];
  // Decode the name to remove %20 and other encoded characters
  const decodedName = decodeURIComponent(name);

  return (
    <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex flex-col items-center justify-center px-4 pt-[20%] sm:px-6 lg:px-8 font-mono">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="flex flex-col mt-[30%] md:flex-row justify-center items-start w-full max-w-6xl   sm:-mt-[10%]">
       
        <div className="mt-4 flex flex-col justify-center items-center md:justify-start w-full md:w-auto">
          
            <div className="text-center text-4xl sm:text-3xl font-mono text-white mb-2 font-bold">
              {decodedName}
            </div>
          <div className="border-[3px] border-white rounded-full w-[200px] h-[200px] p-4 flex flex-col items-center justify-center">
            {/* Decoded name placed above the image */}

            <Image
              className="rounded-full"  // Use rounded-full for perfect circle
              alt="Event Image"
              width={150} // Keep width and height the same
              height={150} // Keep width and height the same
              src={image}
            />
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/3 mt-5 md:mt-0 md:ml-8 space-y-5"> 
          <div className="rounded-[45px] px-9 py-5 flex flex-col sm:flex-row justify-between items-center space-y-5 sm:space-y-0 sm:space-x-4 w-full border-[3px] border-white">
            <div className="font-bold text-2xl text-white">
              Team Size: 
              <span className="text-yellow-600">{TeamSize}</span>
            </div> 
            <div className="text-white text-center sm:text-left ">
              <h2 className="text-2xl sm:text-xl lg:text-2xl font-semibold text-white">
                Prize - <span className="text-yellow-600">{Prize}</span>
              </h2>
            </div>
            <div className="text-white text-center sm:text-left">
              <a href="https://www.canva.com/design/DAGSQQnEbmQ/Nd1HIjR2jmEW5bqs2Yvnqw/edit?utm_content=DAGSQQnEbmQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" 
                 className="text-[25px] rounded-full border-[2px] border-white w-[30%] p-3 bg-yellow-600">
                 Rulebook
              </a> 
            </div>
          </div>

          <div className="border-[3px] border-white rounded-[45px] p-4  flex justify-center">
            <div className="text-white text-left">
              <p className="sm:text-3xl m-7 text-base">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}