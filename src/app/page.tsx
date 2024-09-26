'use client'
import Head from "next/head";
import Instructors from "./components/Instructor";
import Footer from "./components/Footer";
import { BackgroundBeamsWithCollisionDemo } from "./components/Background";
import { CardHoverEffectDemo } from "./components/card";
import Navbar from "./components/Navbar";

export default function Home() {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    console.log(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
    <Head>
        <title>ESummit -2024</title>
    </Head>
    <div className="relative w-full bg-neutral-800 items-center justify-center">
    <Navbar handleScroll={handleScroll}/>
  </div>
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
  <BackgroundBeamsWithCollisionDemo/>
   <section id="events">
    <CardHoverEffectDemo/>
   </section>
      <section id="aboutUs">
      <Instructors />
      </section>
      <Footer />
    </main>
    </>
  );
}
