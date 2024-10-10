'use client'
import Head from "next/head";
import Instructors from "./components/Instructor";
import { BackgroundBeamsWithCollisionDemo } from "./components/Background";
import { CardHoverEffectDemo } from "./components/card";
import Navbar from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import InfinityLoader from "./components/infinite_loader";
import Speakers from './speakers/page';
import { PrizePool } from "./components/prize_pool";
import Footer from "./components/Footer";
import ReactGA from 'react-ga'
import './globals.css';
import GuestSection from "./guests/page";
// import Sponsors from "./sponsors/page";

export default function Home() {
  const [mounted, setMounted] = useState(false); // Track whether the component is mounted
  const eventsSectionRef = useRef(null); // Ref for the events section
  const [loading, setLoading] = useState(true);
  const [visitorCount, setVisitorCount] = useState();
  useEffect(() => {
    const trackingid="G-XGR3BKX6F5";
    ReactGA.initialize(trackingid);
    // Non -iteration event
    ReactGA.pageview(window.location.pathname);
    
    // Fetch visitor count from backend
    // fetch('https://localhost:3000/api/visitors/')
    //   .then((response) => response.json())
    //   .then((data) => setVisitorCount(data.count))
    //   .catch((error) => console.error('Error fetching visitor count:', error));
  }, []);
  // Ensure the component is mounted before accessing query params
  useEffect(() => {
    setMounted(true); // Indicate that the component is mounted
  }, []);

  // Scroll to specific section based on URLSearchParams
  useEffect(() => {
    if (mounted) {
      const searchParams = new URLSearchParams(window.location.search); // Use URLSearchParams to get the query string
      const scrollTo = searchParams.get('scrollTo'); // Get the 'scrollTo' query parameter
      if (scrollTo === "events") {
        eventsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // Simulate a loader for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {loading ? (
        <InfinityLoader /> // Show loader while loading
      ) : (
        <div>
          <Head>
            <title>ESummit -2024</title>
            <link rel="icon" href="/E-summit24 logo.png" />
          </Head>
          <div className="relative w-full bg-neutral-800 items-center justify-center">
            <Navbar handleScroll={handleScroll} />
          </div>
          <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-black/[0.02]">
            <BackgroundBeamsWithCollisionDemo />
            {mounted && ( // Only render the scroll effect when mounted
              <section id="events" ref={eventsSectionRef}>
                <CardHoverEffectDemo />
              </section>
            )}

            <GuestSection/>
            <Speakers/>
            <PrizePool />
            {/* <Sponsors/> */}
         
            <section id="aboutUs">
              <Instructors />
            </section>
            
            <Footer visitorscount={visitorCount}/>
          </main>
        </div>
      )}
    </div>
  );
}
