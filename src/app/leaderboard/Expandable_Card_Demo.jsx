"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/app/Hooks/OutsideClick";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();
  const [leaders,setLeaders]=useState([]);

  useEffect(()=>{
    const fetchLeaderBoard=async()=>{
      try {
        const response= await fetch('/api/leaderboard');

        const data=await response.json();

        if(data.success)
        {
          setLeaders(data.data.slice(3));
        }

        else{
          console.error('Error fetching leaderboard:', data.message);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderBoard();
  },[])
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (<>
    <AnimatePresence>
      {active && typeof active === "object" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 h-full w-full z-10" />
      )}
    </AnimatePresence>
    <AnimatePresence>
      {active && typeof active === "object" ? (
        <div className="fixed inset-0  grid place-items-center z-[100]">
          <motion.button
            key={`button-${active.title}-${id}`}
            layout
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.05,
              },
            }}
            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
            onClick={() => setActive(null)}>
            <CloseIcon />
          </motion.button>
          <motion.div
            layoutId={`card-${active.title}-${id}`}
            ref={ref}
            className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
            <motion.div layoutId={`image-${active.title}-${id}`}>
              <Image
                priority
                // width={200}
                // height={200}
                src={active.src}
                alt={active.title}
                className="h-[30px] w-[50px] sm:w-full md:h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
            </motion.div>

            <div>
              <div className="flex justify-between items-start p-4">
                <div className="">
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-bold text-neutral-700 dark:text-neutral-200">
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400">
                    {active.description}
                  </motion.p>
                </div>

                <motion.a
                  layoutId={`button-${active.title}-${id}`}
                  href={active.ctaLink}
                  target="_blank"
                  className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                  {active.ctaText}
                </motion.a>
              </div>
              <div className="pt-4 relative px-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                  {typeof active.content === "function"
                    ? active.content()
                    : active.content}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
    <ul className="max-w-2xl mx-auto w-full gap-4">
      {leaders.map((leader, index) => (
        <motion.div
          layoutId={`card-${leader.username}-${id}`}
          key={`card-${index}-${id}`}
          className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
          <div className="flex gap-4 flex-col md:flex-row text-white">
          {index+4}
            <motion.div layoutId={`image-${leader.username}-${id}`}>
              <Image
                width={100}
                height={100}
                src={leader.image}
                alt="profile"
                className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top" />
            </motion.div>
            <div className="">
              <motion.h3
                layoutId={`title-${leader.username}-${id}`}
                className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left">
                {leader.username}
              </motion.h3>
              <motion.p
                layoutId={`description-${leader.username}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 text-center md:text-left">
                {leader.email}
              </motion.p>
            </div>
          </div>
          <motion.button
            layoutId={`button-${leader.username}-${id}`}
            className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0">
            {leader.referralCount}
          </motion.button>
        </motion.div>
      ))}
    </ul>
  </>);
}

const cards = [
  {
    description: "Lana Del Rey",
    title: "Rahul Singh",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    Referraldone: "14"
    },
  {
    description: "Babbu Maan",
    title: "Kunal Dubey",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    Referraldone: "12",
    },
  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    Referraldone: "10",
  },
  {
    description: "Andrew Tate",
    title: "Andrew Tate",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone: "8",
  },
  {
    description: "Stephen Hawkings",
    title: "Stephen Hawkings",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone: "8",
  }, {
    description: "Chaman Kajaria",
    title: "Chaman Kajaria",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone:"8",
  },{
    description: "Nikhil Singh",
    title: "Nikhil Singh",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone: "8",
  }, {
    description: "Himanshu gupta",
    title: "Himanshu gupta",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone: "8",
  }, {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone:"8",
  }, {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone:"4",
  }, {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone:"2",
  }, {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone:"2",
  }, {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    Referraldone:"1",
  },
  {
    description: "Mustafa Zahid",
    title: "Toh Phir Aao",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    Referraldone:"0",
  },
  {
    description: "Mustafa Zahid",
    title: "Toh Phir Aao",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    Referraldone:"0",
  },
  {
    description: "Mustafa Zahid",
    title: "Toh Phir Aao",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    Referraldone:"0",
  },
  {
    description: "Mustafa Zahid",
    title: "Toh Phir Aao",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    Referraldone:"0",
  },
  
];
