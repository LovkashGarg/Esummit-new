import React from "react";
import { Spotlight } from "./ui/Spotlight";
import Image from "next/image";
export function SpotlightPreview() {
  return (
    (<div
      className="h-[150vh] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className=" max-w-7xl  mx-auto relative z-10 border-[3px] border-white rounded-[20px]  w-full pt-20 md:pt-0 mx-[4%] ">
        <div className="flex items-center justify-center  ">
        <h1
          className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Startup Saga 
        </h1>
        </div>
        <div className="flex items-center justify-evenly">
        <p
          className="p-4 mt-4 font-normal text-base text-neutral-300 max-w-lg text-center">
          Spotlight effect is a great way to draw attention to a specific part
          Startup Saga at IIIT Pune is a flagship event organized by the Entrepreneurship Cell (Ecell) of the Indian Institute of Information Technology (IIIT), Pune. It aims to foster entrepreneurship among students, provide a platform for budding innovators, and create a vibrant entrepreneurial ecosystem within the institute.

Key Highlights of Startup Saga:
Entrepreneurship Exposure:

Startup Saga serves as an excellent opportunity for students to gain exposure to the world of startups, entrepreneurship, and innovation. It typically features industry experts, successful entrepreneurs, and startup founders who share their journey and insights.
Workshops and Competitions:

The event includes various workshops on essential entrepreneurial skills such as product development, business model creation, pitching, and marketing.
Competitions like business plan contests, pitch battles, and innovation challenges offer students a chance to present their startup ideas and receive valuable feedback.
Networking Opportunities:

Students get to interact with entrepreneurs, industry professionals, and potential investors. This can lead to mentorship opportunities, internships, or even seed funding for promising ideas.
Panel Discussions and Talks:
        </p>
        <div className="max-h-full max-w-full">
        <img  className="h-[400px] w-[400px]" src={'/Events/BC_logo.png'} alt="Breaking Convention" />
        </div>
        </div>
      </div>
    </div>)
  );
}
