"use client"
import { getServerSideProps } from 'next/server';
import { SpotlightPreview } from "../components/Spotlight_preview";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect,useState } from "react";
// import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
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

return (
    <>
    <Navbar/>
    <SpotlightPreview />
    <Footer/>
    </>
)
}
export default Page;