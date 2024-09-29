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

      <div className="flex flex-col md:flex-row justify-center items-start w-full max-w-6xl mt-10 sm:mt-10">

       
      <div className="mt-4 sm:mt-10 flex justify-center md:justify-start w-full md:w-auto">

          <div className="border-[3px] border-white rounded-full  p-10 w-full max-w-xs mx-auto">
            <Image
              className="rounded-lg  w-[200px] h-[200px] mx-auto"
              alt="Event Image"
              width={100}
              height={100}
              src={image}
            />

          </div>
            <p className="text-center mt-5 text-4xl font-sans  text-white">{decodedName}</p>

            
        </div>

        

      
        <div className="flex flex-col w-full md:w-2/3 mt-5 md:mt-0 md:ml-8 space-y-5 "> 

         
        <div className="rounded-[45px] px-9 py-5 flex flex-col sm:flex-row justify-between items-center space-y-5 sm:space-y-0 sm:space-x-4 w-full border-[3px] border-white">


            <div className="font-bold text-xl  text-white">
              Team Size : 
              <span className="text-yellow-600">
                2 members
                </span>
            </div> 
            <div className=" text-white text-center sm:text-left">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold  text-white">Prize- 
                <span className="text-yellow-600">
                  6K
                  </span>
                </h2>
             
            </div>

           <div className=" text-white text-center sm:text-left   ">
             
               <a href='https://docs.google.com/document/d/1vtWbd09r5kkVDr9IZJecpsS6v2mQ9G7Ylp5NqhOJDUc/edit?usp=sharing' className=" text-[25px]  rounded-full border-[2px] border-white  w-[30%] p-3 bg-yellow-600">Rulebook</a> 
            
            </div>
            

          </div>

        
          <div className="border-[3px] border-white rounded-[45px] p-4 flex justify-center">
            <div className="text-white text-left">
              <p className="text-sm sm:text-lg m-7">{description}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
