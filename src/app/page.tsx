'use client'
import Head from "next/head";
import Instructors from "./components/Instructor";

import { BackgroundBeamsWithCollisionDemo } from "./components/Background";
import { CardHoverEffectDemo } from "./components/card";
import Navbar from "./components/Navbar";
import { useEffect, useState, useRef } from "react";
import InfinityLoader from "./components/infinite_loader";
import Speakers from './speakers/page';
import { PrizePool } from "./components/prize_pool";
import Footer from "./components/Footer";
import './globals.css';
import { useSearchParams } from "next/navigation"; // Using useSearchParams for query params

export default function Home() {
  const searchParams = useSearchParams(); // Using Next.js's useSearchParams hook
  const eventsSectionRef = useRef(null); // Ref for the events section

  const [loading, setLoading] = useState(true);

  // Handle scrolling based on the query parameter
  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    console.log("hello I am ",scrollTo)
    if (scrollTo === 'events') {
      // Scroll to the events section when 'scrollTo' equals 'events'
      eventsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }); // Only runs when search params change

  // Simulate a data fetch with a timeout for loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  // Manually handle smooth scroll when clicking links in the Navbar
  const handleScroll = (sectionId) => {
    console.log("scrolling ")
    // const section = document.getElementById(sectionId);
    // if (section) {
    //   section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }
  };

  return (
    <div>
      {loading ? (
        <InfinityLoader /> // Show loader while loading
      ) : (
        <>
          <Head>
            <title>ESummit -2024</title>
            <link rel="icon" href="/E-summit24 logo.png" />
          </Head>
          <div className="relative w-full bg-neutral-800 items-center justify-center">
            <Navbar handleScroll={handleScroll} />
          </div>
          <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-black/[0.02]">
            <BackgroundBeamsWithCollisionDemo />
            <section id="events" ref={eventsSectionRef} >
              <CardHoverEffectDemo />
            </section>
            <PrizePool />
            <Speakers />
            <section id="aboutUs">
              <Instructors />
            </section>
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}
