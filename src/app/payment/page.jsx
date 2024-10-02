"use client"
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
// import { Checkmark } from 'react-checkmark'
// import Link from 'next/link';
import CheckboxPopupMenu from './popup';
import { useState} from 'react';
import InfinityLoader from '../components/infinite_loader';
// import { useRouter } from 'next/router';
// const Router=useRouter();
import ReactGA from 'react-ga';

import { useEffect } from 'react';
import { trusted } from 'mongoose';

const TicketSection = () => {
  const trackingid="G-XGR3BKX6F5";
  ReactGA.initialize(trackingid);
  useEffect(() => {
    // Non -iteration event
    ReactGA.pageview(window.location.pathname);
  })
  const tickets = [
    {
      id: 1,
      title: 'SAGA PASS',
      price: '₹150',
      color:"#567135",
      description: 'STARTUP SAGA PASSS',
      events: [
        { description: 'ONLY ACCESS TO STARTUP SAGA', value: true },
        { description: 'ONLY INR 100 FOR EARLY BIRDS', value: true },
        { description: 'INTERNSHIP CHANCES', value: true }
      ]
    
    },
    {
      id: 2,
      title: 'VALUE PASS',
      price: '₹200',
      color:"#2c3e50",
      description: ' PASS',
      events: [
        { description: 'ACCESS TO ALL 8 EVENTS', value: true },
        { description: 'BEST VALUE', value: true },
        { description: 'STARTUP SAGA NOT INCLUDED', value: false }
      ]
    },
    {
      id:3,
      title: 'MAHARAJA PASS',
      price: '₹250',
      color:"#97262a",
      description: 'Feasible PASS',
      events: [
        { description: 'ACCESS TO ALL EVENT', value: true },
        { description: 'STARTUP SAGA INCLUDED', value: true },
        { description: 'VALUE FOR MONEY', value: true }
      ]
    },
    
  ];

  const tickets2=[
    {
      id: 4,
      title: 'E-TRIO PASS ',
      price: '₹150',
      color:"#56799a",
      description: 'ONLINE PASS',
      events: [
        { description: 'ACCESS TO ALL ONLINE EVENTS', value: true },
        { description: 'OFFLINE EVENTS NOT INCLUDED', value: false }
      ]
    },
    {
      id: 5,
      title: 'UNI PASS ',
      price: '₹50',
      color:"#56462a",
      description: 'Access to all sessions.',
      events: [
        { description: 'ACCESS TO ANY ONE SINGLE EVENT', value: true },
        { description: 'STARTUP SAGA NOT INCLUDED', value: false }
      ]
    },
    {
      id: 6,
      title: 'FLEXI PASS',
      price: '₹100',
      color:"#c25b56",
      description: 'Discounted rate for students.',
      events: [
        { description: 'ACCESS TO ANY THREE OFFLINE EVENTS', value: true },
        { description: 'STARTUP SAGA NOT INCLUDED', value: false }
      ]
    },
   
  ];


  const [isOpen, setIsOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const checkboxes = [
    
    { id: 1, label: 'Startup Survival' },
    { id: 2, label: 'Breaking Convention' },
    { id: 3, label: 'Brand Brawl' },
    { id: 4, label: 'Stadium Showdown' },
    { id: 5, label: 'Lights Out' },
    { id: 6, label: 'OTH' },
    { id: 7, label: 'Big Bull' },
    { id: 8, label: 'E summit Junior'},
  ];

  const offlineCheckboxes=[
    { id: 1, label: 'Startup Survival' },
    { id: 2, label: 'Breaking Convention' },
    { id: 3, label: 'Brand Brawl' },
    { id: 4, label: 'Stadium Showdown' },
    { id: 5, label: 'Lights Out' },
  ]

  const toggleCheckbox = (id) => {
    if (Ticketid === 5) {
      // For ticket ID 1, allow only one selection
      setSelectedCheckboxes([id]);
    } else if (Ticketid === 6) {
      // For ticket ID 3, allow up to 3 selections
      if (selectedCheckboxes.includes(id)) {
        setSelectedCheckboxes(selectedCheckboxes.filter((checkboxId) => checkboxId !== id));
      } else {
        if (selectedCheckboxes.length < 3) {
          setSelectedCheckboxes([...selectedCheckboxes, id]);
        }
      }
    }
    console.log(selectedCheckboxes);
  };

const [Ticketid,setTicketId]=useState();
  const handleSubmit = (ticketid) => {
    if(ticketid===6){
       // I have to check if done or not 
       if(selectedCheckboxes.length!==3){
        alert("Please select 3 events");
        return;
       }
    }
    // href={`/payment/${ticket.id}`}
    // window.location.href = `/payment/${Ticketid}`;
    const events = selectedCheckboxes.join(',');
    // Appending the ticketId and selected events to the query parameters
    window.location.href = `/payment/${ticketid}?events=${events}`;
    // router.push({
    //   pathname: `/payment/${Ticketid}`,
    //   query: { events: selectedCheckboxes.join(",") },  // Pass events via query parameters
    // });
    // Router.push(`/payment/${Ticketid}`);
    // alert(`Selected Checkboxes: ${selectedCheckboxes.join(', ')}`);
    // setIsOpen(false); // Close the popup after submission
  };

  const handlebuyNow=(ticketid)=>{

    setTicketId(ticketid);
    // alert(Ticketid);
    if(ticketid==5 || ticketid ==6){
      setIsOpen(true);
    }
    else{
      handleSubmit(ticketid);
    }
  }
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
    <div className='bg-black'>
    <Navbar/>
    <div className="container">
      {/* <h1>Main Container</h1> */}
      {/* <button onClick={() => setIsOpen(true)}>Open Popup Menu</button> */}

      {isOpen && (
        <div className="popup text-white ">
          <div className="popup-content  overscroll-none w-[75%] md:w-[30%]">
            <h2 className='md:text-[35px]  '>Select Events (Max {Ticketid === 5 ? 1 : 3})</h2>
            <div className='flex flex-col my-[8%] gap-3 px-[20%]'>
            { Ticketid===5 &&
                checkboxes.map((checkbox) => (
              <label key={checkbox.id} className='flex gap-4'>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes.includes(checkbox.id)}
                  onChange={() => toggleCheckbox(checkbox.id)}
                />
                {checkbox.label}
              </label>

            ))
            }
            { Ticketid===6 &&
                offlineCheckboxes.map((checkbox) => (
              <label key={checkbox.id} className='flex gap-4'>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes.includes(checkbox.id)}
                  onChange={() => toggleCheckbox(checkbox.id)}
                />
                {checkbox.label}
              </label>

            ))
            }
          
            </div>
            <div className="popup-buttons  flex justify-between">
              <button className='text-white bg-green-800 rounded-[20px] w-[100px] ' onClick={()=>handleSubmit(Ticketid)} disabled={selectedCheckboxes.length < 1}>
                Submit
              </button>
              <button className='text-white bg-red-800 rounded-[20px] w-[100px] ' onClick={() => setIsOpen(false)}>X Close</button>
            </div>
          </div>
          <style jsx>{`
            .popup {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
            //   opacity:0.9;
              justify-content: center;
              align-items: center;
            }
            .popup-content {
              background: black;
              padding: 20px;
              border-radius: 8px;
             
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .popup-buttons {
              margin-top: 10px;
            }
          `}</style>
        </div>
      )}
    </div>
    <div className="mt-[200px] sm:mt-[100px]  max-w-7xl mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-white font-mono">Choose Your Tickets</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tickets.map(ticket => (
           <div className='flex mx-[10%]  flex-col'>
                  <div key={ticket.id} className={`${ticket.id==3? 'block':'hidden'}  bg-slate-900 text-center h-[40px] text-[30px] rounded-[10px]  text-white font-mono `}>ULTIMATE BLEND</div>
                  <div key={ticket.id} className={`${ticket.id==1? 'block':'hidden'} bg-slate-900 text-center h-[40px] text-[30px] rounded-[10px]  text-white font-mono`}>Recommended</div>
           <div key={ticket.id} className={`${ticket.id==2? 'block':'hidden'} bg-slate-900 text-center h-[40px] text-[30px] rounded-[10px]  text-white font-mono`}>Most Popular</div>
          <div key={ticket.id}  style={{ backgroundColor: ticket.color }}  className={` border-[5px] border-gray-300 rounded-[30px] p-6 mt-[10px] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-center`}>
            <h3 className="text-xl text-yellow-400 font-semibold mb-4">{ticket.title}</h3>
            <p className="text-white mb-4">{ticket.description}</p>
            <p className="text-2xl font-bold text-yellow-300 mb-4">{ticket.price}</p>
        
            <ul className="list-none ">
              {ticket.events.map((event, index) => (
                <li key={index} className="text-white my-[10px] flex  gap-[8px] items-center justify-left "><img 
                src={event.value === true 
                  ? "https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png" 
                  : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTxrkxNAMmeFKA4APfYroPBGka9cjra4B_RyAiOcsp57t6xOL6V'} 
                alt="" 
                className='w-[40px] h-[40px]  ' 
              />
              <div className='text-[15px] text-left'>{event.description}</div></li>
              ))}
            </ul>
            <button onClick={() => {handlebuyNow(ticket.id)}  }  className='mt-5 mx-[15%] bg-slate-900 text-white rounded-[20px] w-[150px] sm:w-[160px] md:w-[200px] h-[40px] text-[25px] '>Buy Now</button>
          </div>
          </div>
        ))}
      </div>
      <div className="mt-[5%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tickets2.map(ticket => (
            
           <div className='flex mx-[10%] flex-col'>

          <div key={ticket.id}  style={{ backgroundColor: ticket.color }}  className={` border-[5px] border-gray-300 rounded-[30px] p-6 mt-[10px] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-center`}>
            <h3 className="text-xl text-yellow-400 font-semibold mb-4">{ticket.title}</h3>
            <p className="text-white mb-4">{ticket.description}</p>
            <p className="text-2xl font-bold text-yellow-300 mb-4">{ticket.price}</p>
        
            <ul className="list-none ">
              {ticket.events.map((event, index) => (
                <li key={index} className="text-white my-[10px] flex  gap-[8px] items-center justify-left "><img 
                src={event.value === true 
                  ? "https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png" 
                  : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTxrkxNAMmeFKA4APfYroPBGka9cjra4B_RyAiOcsp57t6xOL6V'} 
                alt="" 
                className='w-[40px] h-[40px] ' 
              />
              <div className='text-[15px] text-left'>{event.description}</div></li>
              ))}
            </ul>
            <button onClick={() => {handlebuyNow(ticket.id)}  }  className='mt-5 mx-[15%] bg-slate-900 text-white rounded-[20px] w-[150px] sm:w-[160px] md:w-[200px] h-[40px] text-[25px] '>Buy Now</button>
          </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    {/* <CheckboxPopupMenu/> */}
    </div>
    )}
    </div>
  );
};

export default TicketSection;
