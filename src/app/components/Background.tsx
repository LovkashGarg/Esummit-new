import React from "react";
import { BackgroundBeamsWithCollision } from "@/app/components/ui/background-beams-with-collision";
import Image from "next/image";
import logo from "../../../public/courses/E-summit24 logo.png"
// import { TextHoverEffect } from "./ui/text-hover-effect";
// import { TextRevealCard } from "./ui/text-reveal-card";
// import { BackgroundBoxesDemo } from "./BackgroundBoxes";
import { SparklesCore } from "./ui/sparkles";
import { Vortex } from "./ui/vortex";
export function BackgroundBeamsWithCollisionDemo() {
  return (
    
    
     
     <div className=" h-[40rem] w-full bg-black bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-black flex flex-col justify-end items-center overflow-hidden rounded-md  ">
     <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-end px-2 md:px-10 py-4 w-full h-full"
      >
        <Image src={logo} width={400} height={400} alt="logo"/>
        </Vortex>
      <div className="w-full h-40 relative bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900 dark:to-black">
        {/* Gradients */}
        {/* <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-1/3 blur-sm" /> */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/3 " />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[5px] w-2/3 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/3" />

        {/* Core component */}
        {/* <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1400}
          className="w-full h-full"
          particleColor="#FFFFFF"
        /> */}

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]">

        </div>
        
      </div>
        
    </div>
    
  );
}
