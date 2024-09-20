'use client'
// import Image from "next/image";
// import HeroSection from "../../../../Ecell/ecell/src/app/components/HeroSection";
// import FeaturedCourses from "./components/FeaturedCourses";
import { LampHeader } from "./components/LampHeader";
// import WhyChooseUs from "../../../../Ecell/ecell/src/app/components/WhyChooseUs";
// import { Testimonial } from "../../../../Ecell/ecell/src/app/components/Testimonial";
// import { BentoGridThirdDemo } from "../../../../Ecell/ecell/src/app/components/BentoGrid";
import Instructors from "./components/Instructor";
import Footer from "./components/Footer";
import { BackgroundBeamsWithCollisionDemo } from "./components/Background";
// import { BackgroundBeamsDemo } from "./components/Beam";
import { CardHoverEffectDemo } from "./components/card";
// import { BackgroundBoxesDemo } from "./components/BackgroundBoxes";
// import { SparklesCore } from "./components/ui/sparkles";
// import { SparklesPreview } from "./components/SparklesPreview";
// import SignupFormDemo from "./signup/page"
import Payment_gateway from "./components/Payment_gateway";
import Leaderboard from "./components/LeaderBoard";
import Navbar from "./components/Navbar";
export default function Home() {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    console.log(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
    <div className="relative w-full bg-neutral-800 items-center justify-center">
    <Navbar handleScroll={handleScroll}/>
  </div>
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">

      <BackgroundBeamsWithCollisionDemo/>
     {/* <SparklesPreview/> */}
<section id="events">
   <CardHoverEffectDemo/>
</section>
   
      {/* <HeroSection /> */}
      <LampHeader />
      {/* <FeaturedCourses /> */}
      {/* <WhyChooseUs /> */}
      {/* <Testimonial /> */}
      {/* <BentoGridThirdDemo /> */}
      {/* <SignupFormDemo/> */}
      <Payment_gateway/>
      <section id="aboutUs">
      <Instructors />
      </section>
      <Leaderboard/>
      <Footer />
    </main>
    </>
  );
}
