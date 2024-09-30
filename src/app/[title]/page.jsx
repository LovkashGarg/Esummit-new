"use client"
// import { getServerSideProps } from 'next/server';
import { SpotlightPreview } from "../components/Spotlight_preview";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

import InfinityLoader from "../components/infinite_loader";
// import { useRouter } from 'next/router'; // Import the useRouter hook
import { usePathname } from 'next/navigation'; 

const Page = (c) => {
  const pathname = usePathname(); // Get the current path from next/navigation
  const [title, setTitle] = useState(''); 
  const [matchedEvent, setMatchedEvent] = useState(null); 
  // Extract the dynamic title from the path
  useEffect(() => {
    if (pathname) {
      const titleFromPath = pathname.split("/").pop(); // Get the title from the dynamic route
      setTitle(titleFromPath); // Set the title from the path
      const checkEventMatch = () => {
        const foundEvent = eventsData.find(event => event.name === titleFromPath); // Check for match
        setMatchedEvent(foundEvent); // Set matched event or null if not found
      };

      checkEventMatch(); // Call the function to check for matches
    }
  }, [pathname]);
  const eventsData = [
    {
      id: 1,
      name: "StartUp%20Saga",
      description: "Enter a world where startups, investors, and students collide, unlocking opportunities for the next big venture. Startups reveal their innovations, offering internships to sharp-minded students, while investors seek the next breakthrough. Will you be part of the success story waiting to unfold?",
      image: "/Events/SatrtupSaga_logo.png",
      TeamSize:"Indivisual"
     
     
    },
    {
      id: 2,
      name: "Esummit%20Junior",
      description: "Attention 8th-10th graders! Ready to unlock your potential at E-Summit Jr? Step into an exciting world of challenges, test your skills in a thrilling academic showdown, and sharpen your wits. Join us at 111T Pune for an unforgettable experience—where only the boldest will rise to the top!",
      image: "/Events/E-JR_logo.png",
      TeamSize:"Indivisual",
      p:"Prize -",
      Prize:""
    },
    {
      id: 3,
      name: "Stadium%20%20Showdown",
      description: "Here fortune clashes and champions rise!! . Make your own IPL team.Each team enters with equal riches and  bidding for cricket’s finest  under the lights.Will strategy or boldness win the ultimate auction?The stakes are high and every bid could change your destiny!",
      image: "/Events/StadiumShowdown_logo.png",
      p:"Prize -",
      TeamSize:"3-5",
      Prize:"10K"
    },
    {
      id: 4,
      name: "Breaking%20Convention",
      description: "Get ready for Season Four of Breaking Conventions, where boundaries blur and innovation takes center stage. Join us as our trailblazing speakers challenge the norm and ignite the future of India's startup culture. (more about actual Speaker)",
      image: "/Events/BC_logo.png",
      TeamSize:"Indivisual"
    
     
    },
    {
      id: 5,
      name: "Big%20Bull",
      description: "Step into the high-stakes world of trading, where fortunes are made or lost. With a demo account on STOCKGRO, you'll test your skills, turning virtual cash into real triumph. Over 3-4 intense days, every trade could bring you closer to victory. Will your portfolio rise to the top and crown you the Big Bull?",
      image: "/Events/BigBull_logo.png",
      TeamSize:"Indivisual",
      p:"Prize -",
      Prize:"4.5K"
    },
    {
      id: 6,
      name: "Brand%20Brawl",
      description: "Where top execs debate high-stakes crises in TopTalks, each defending their strategies. Then, watch as rival teams clash over global issues in a heated final. Only the sharpest arguments will lead to victory. Can your team dominate the debate?",
      image: "/newEvents/brandb.png",
      TeamSize:"Indivisual",
      p:"Prize -",
      Prize:"6k"
    },

    {
      id: 7,
      name: "StartUp%20Survival",
      description: "Trapped in a race against time,only your wits can save you. Cryptic clues lie hidden,waiting to be unveiled by you. Every second brings you closer to the escape— or failure. Team up, crack the code, and unlock the code before time runs out.",
      image: "/newEvents/startups.png",
      TeamSize:"4-6",
      p:"Prize -",
      Prize:"10K"
    },
    {
      id: 8,
      name: "Lights%20Out",
      description: 
      "Step into the unknown with our mystery coding event—no hints, no code on screen. Just you, your memory, and the challenge ahead. Can you solve the puzzles when the lights are out?",
      image: "/Events/LightsOut_logo.png",
      TeamSize:"Indivisual",
      p:"Prize -",
      Prize:"6K"
    },
    {
      id: 9,
      name: "OTH",
      description: "Embark on a thrilling online treasure hunt, where each image or text clue unlocks the path forward. Over 2-3 days, navigate through hurdles, solving each question before advancing. The ultimate prize awaits the player who conquers the most challenges before the deadline. Will you be the one to uncover the treasure?",
      image: "/Events/Oth_logo.png",
      TeamSize:"Indivisual",
      p:"Prize -",
      Prize:"4.5K"
    },
    // ... more events
  ];


  const [loading, setLoading] = useState(true);

  // Simulate a data fetch with a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  return (
    <div>
      {loading ? (
        <InfinityLoader /> // Show loader while loading
      ) : (
        <>
          <Navbar />
          <SpotlightPreview eventsData={matchedEvent} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
