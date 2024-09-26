"use client"
// import { getServerSideProps } from 'next/server';
import { SpotlightPreview } from "../components/Spotlight_preview";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect,useState } from "react";
import InfinityLoader from "../components/infinite_loader";
// import { useParams } from 'next/navigation';
// import { useRouter } from 'next/router';
const Page=(context)=>{

    const eventsData = [
        {
          id: 1,
          name: "Event 1",
          description: "Description for Event 1",
          image: "path/to/event1.jpg"
        },
        {
          id: 2,
          name: "Event 2",
          description: "Description for Event 2",
          image: "path/to/event2.jpg"
        },
        // ... more events
      ];
      
    //   const router = useRouter();
const title="OTH";
  const [event, setEvent] = useState(null);
  useEffect(() => {
      const selectedEvent = eventsData.find((event) => event.id === parseInt(title));
      setEvent(selectedEvent);
      console.log(title);
  }, [title]);


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
    <Navbar/>
    <SpotlightPreview />
    <Footer/>
    </>
    )}
    </div>
)
}
export default Page;