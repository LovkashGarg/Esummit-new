"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import { HoverEffect } from "./ui/card-hover-effect";
import { projects } from "./card";
export function LampHeader() {
  return (
    
    <LampContainer >
      <motion.h1
        initial={{ opacity: 0.5, y: 100}}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-xl"
      > 
      
      </motion.h1> 
      <HoverEffect className="mt-[70px]" items={projects} />
    </LampContainer>
  );
}
