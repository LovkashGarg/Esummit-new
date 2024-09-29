import React from "react";
import { Spotlight } from "./ui/Spotlight";
import Image from "next/image";

export function SpotlightPreview(eventData) {
  const { id, name, description, image } = eventData['eventsData'];
  // Decode the name to remove %20 and other encoded characters
  const decodedName = decodeURIComponent(name);

  return (
    <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="flex flex-col md:flex-row justify-center items-start w-full max-w-6xl">

       
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <div className="border-[3px] border-white rounded-[45px] mt-5 md:mt-0 p-3 w-full sm:w-3/4 md:w-full">
            <Image
              className="rounded-md object-cover"
              alt="Event Image"
              width={200}
              height={200}
              src={image}
            />
          </div>
        </div>

      
        <div className="flex flex-col w-full md:w-2/3 mt-5 md:mt-0 md:ml-8 space-y-5 "> 

         
          <div className="rounded-[45px] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-5 sm:space-y-0 sm:space-x-4 w-full border-[3px] border-white">

           
            <div className="flex-1 text-white text-center sm:text-left">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">{decodedName}</h2>
            </div>

          
            <div className="flex-1 text-white text-center sm:text-left">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">Section 2</h2>
             
            </div>

           
            <div className="flex-1 text-white text-center sm:text-left">
             
               <a href='https://docs.google.com/document/d/1vtWbd09r5kkVDr9IZJecpsS6v2mQ9G7Ylp5NqhOJDUc/edit?usp=sharing' className="bg-blue-600 text-white text-[25px] mx-[30%] rounded-[10px] border-[2px] border-white px-[4%] w-[30%]">Rulebook</a> 
            
            </div>

          </div>

        
          <div className="border-[3px] border-white rounded-[45px] p-4 flex justify-center items-center">
            <div className="text-white text-center">
              <p className="mt-4 text-sm sm:text-lg">{description}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
