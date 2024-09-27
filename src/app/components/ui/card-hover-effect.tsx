'use client'

import { cn } from "@/app/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
// import { LampHeader } from "../LampHeader";
import Image from 'next/image'


export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    imageurl: string;
    // description:string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="pt-[150px]">
     <div className=" text-[40px] sm:text-[60px] pt-[50px] text-">Our Events</div>
    <div
      className={cn(
        "h-[350vh] sm:h-[200vh] md:h-[100vh] grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  ",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence >
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="flex flex-col items-center justify-center">
            <CardTitle>{item.title}</CardTitle>
            <img  className="  w-[250px] h-[100px] mt-[30px]"           // Allows the image to fill the parent container
           // Allows the image to fill the parent container
           style={{ objectFit: 'contain' }}    src={item.imageurl}></img>
            {/* <CardDescription>{item.description}</CardDescription> */}
            <Link href={`${item.title}`}><button className="h-[40px]  mt-[5%] mx-auto px-[10%] bg-blue-800 text-white  text-[20px] sm:text-[25px] rounded-[20px] ">Know More</button></Link>
          </Card>
        </div>
      ))}
    </div>
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
    </>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 text-[30px] tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
