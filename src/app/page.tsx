'use client'
import Head from "next/head";
import Instructors from "./components/Instructor";
import Footer from "./components/Footer";
import { BackgroundBeamsWithCollisionDemo } from "./components/Background";
import { CardHoverEffectDemo } from "./components/card";
import Navbar from "./components/Navbar";
import { useEffect ,useState} from "react";
import InfinityLoader from "./components/infinite_loader";
import Speakers from './speakers/page'
import { PrizePool } from "./components/prize_pool";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate a data fetch with a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timeout
  }, []);
  function handleScroll(sectionId){
    const section = document.getElementById(sectionId);
    console.log(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
    {loading ? (
      <InfinityLoader /> // Show loader while loading
    ) : (
    <>
    <Head>
        <title>ESummit -2024</title>
        {/* <link rel="icon" href="/E-summit24 logo.png" /> */}
    </Head>
    <div className="relative w-full bg-neutral-800 items-center justify-center">
    <Navbar handleScroll={handleScroll}/>
  </div>
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-black/[0.02]">
  <BackgroundBeamsWithCollisionDemo/>
   <section id="events">
    <CardHoverEffectDemo/>
   </section>
   <PrizePool/>
   <Speakers/>
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
