// import React from "react";
// import Image from "next/image";
// // import logo from "../../../public/courses/E-summit24 logo.png"
// import logo from "../../../public/courses/websitebg.png"
// import { Vortex } from "./ui/vortex";
// export function BackgroundBeamsWithCollisionDemo() {
//   return (
    
    
     
//      <div className="h-[25rem]  sm:h-[40rem] w-full bg-black bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-black flex flex-col justify-end   items-center overflow-hidden rounded-md  ">

// {/* <div
//         className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url('/courses/websitebg.png')`, // Adjust the path to match your image
//         }}
//       ></div> */}


//      <Vortex
//         backgroundColor="black"
//         // backgroundImage={logo}
//         className="flex items-center flex-col justify-end px-2 md:pt-[150px] py-4 w-full h-full"
//       >
//         {/* <Image src={logo} className="pt-[70px] w-[300px] h-[300px]  sm:w-[400px] sm:h-[400px] "  alt="logo"/> */}
//         </Vortex>


// <div className="absolute inset-0">
//         <Image
//           src={logo}
//           alt="Background Logo"
//           layout="fill"
//           objectFit="cover"
//           className="opacity-250 brightness-125" // Adjust opacity for visibility
         
//         />
//       </div>





//         <div className="hidden md:block w-full h-40 relative bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900 dark:to-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]">
//         <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/3 " />
//         <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[5px] w-2/3 blur-sm" />
//         <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/3" />


//         <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]">

//         </div>
        
//       </div>
        
//     </div>
    
//   );
// }


import React from "react";
import logo from "../../../public/courses/websitebg.png"; // Image object
import { Vortex } from "./ui/vortex";

export function BackgroundBeamsWithCollisionDemo() {
  return (
    <div className="relative h-[25rem] sm:h-[40rem] w-full bg-black bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-black flex flex-col justify-end items-center overflow-hidden rounded-md">
      
      {/* Fullscreen background using image object */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${logo.src})`, // Set background image using the image object's src
          backgroundSize: 'cover',  // Ensures the image covers the entire div
          backgroundPosition: 'center',  // Centers the image
          backgroundRepeat: 'no-repeat',  // Prevents the image from repeating
          filter: 'brightness(1.5)',
        }}
      ></div>

      {/* Optional Vortex Animation */}
      <Vortex
        backgroundColor="transparent" // Keep it transparent so the background image is visible
        className="flex items-center flex-col justify-end px-2 md:pt-[150px] py-4 w-full h-full"
      >
        {/* Add other content here */}
      </Vortex>

      {/* Additional content or gradient effects */}
      <div className="hidden md:block w-full h-40 relative bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900 dark:to-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/3" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[5px] w-2/3 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/3" />
      </div>

    </div>
  );
}
