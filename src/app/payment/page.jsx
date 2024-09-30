"use client"
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
// import { Checkmark } from 'react-checkmark'
import Link from 'next/link';
import CheckboxPopupMenu from './popup';
import { useState} from 'react';
import InfinityLoader from '../components/infinite_loader';
// import { useRouter } from 'next/router';
// const Router=useRouter();
import { useEffect } from 'react';
const TicketSection = () => {
  const tickets = [
    {
      id: 1,
      title: 'UNI PASS ',
      price: '₹50',
      color:"#56799a",
      description: 'Access to all sessions.',
      events: ['ACCESS TO ANY ONE SINGLE EVENT', 'STARTUP SAGA NOT INCLUDED']
    },
    {
      id: 2,
      title: 'VALUE PASS',
      price: '₹200',
      color:"#2c3e50",
      description: 'ULTIMATE PASS',
      events: ['ACCESS TO ANY ALL 8 EVENTS', 'BEST VALUE','STARTUP SAGA NOT INCLUDED']
    },
    {
      id: 3,
      title: 'FLEXI PASS',
      price: '₹100',
      color:"#c25b56",
      description: 'Discounted rate for students.',
      events: ['ACCESS TO ANY THREE OFFLINE EVENTS', 'STARTUP SAGA NOT INCLUDED']
    },
  ];

  const tickets2=[
    {
      id: 4,
      title: 'E-TRIO PASS ',
      price: '₹150',
      color:"#56799a",
      description: 'ONLINE PASS',
      events: ['ACCESS TO ALL THREE ONLINE EVENTS', 'OFFLINE EVENTS NOT INCLUDED']
    },
    {
      id: 5,
      title: 'SAGA PASS',
      price: '₹150',
      color:"#2c3e50",
      description: 'STARTUP SAGA PASSS',
      events: ['ONLY ACCESS TO STARTUP SAGA', 'ONLY INR 100 FOR EARLY BIRDS','INTERNSHIP CHANCES']
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
  ];

  const toggleCheckbox = (id) => {
    if (Ticketid === 1) {
      // For ticket ID 1, allow only one selection
      setSelectedCheckboxes([id]);
    } else if (Ticketid === 3) {
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
    if(ticketid===3){
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
    if(ticketid==1 || ticketid ==3){
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
            <h2 className='md:text-[35px]  '>Select Events (Max {Ticketid === 1 ? 1 : 3})</h2>
            <div className='flex flex-col my-[8%] gap-3 px-[20%]'>
            {checkboxes.map((checkbox) => (
              <label key={checkbox.id} className='flex gap-4'>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes.includes(checkbox.id)}
                  onChange={() => toggleCheckbox(checkbox.id)}
                />
                {checkbox.label}
              </label>
            ))}
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
      <h2 className="text-4xl font-bold text-center mb-12 text-white">Choose Your Tickets</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tickets.map(ticket => (
           <div className='flex mx-[10%]  flex-col'>
           <div key={ticket.id} className={`${ticket.id==2? 'block':'hidden'} bg-slate-900 text-center h-[40px] text-[30px] rounded-[10px]  text-white`}>Most Popular</div>
          <div key={ticket.id}  style={{ backgroundColor: ticket.color }}  className={` border-[5px] border-gray-300 rounded-[30px] p-6 mt-[10px] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-center`}>
            <h3 className="text-xl text-yellow-400 font-semibold mb-4">{ticket.title}</h3>
            <p className="text-white mb-4">{ticket.description}</p>
            <p className="text-2xl font-bold text-yellow-300 mb-4">{ticket.price}</p>
        
            <ul className="list-none ">
              {ticket.events.map((event, index) => (
                <li key={index} className="text-white my-[10px] flex  items-center justify-left "><img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png" alt="" className='w-[40px] h-[40px]' /><div className='text-[15px] text-left'>{event}</div></li>
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
           <div key={ticket.id} className={`${ticket.id==5? 'block':'hidden'} bg-slate-900 text-center h-[40px] text-[30px] rounded-[10px]  text-white`}>Recommended</div>
          <div key={ticket.id}  style={{ backgroundColor: ticket.color }}  className={` border-[5px] border-gray-300 rounded-[30px] p-6 mt-[10px] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-center`}>
            <h3 className="text-xl text-yellow-400 font-semibold mb-4">{ticket.title}</h3>
            <p className="text-white mb-4">{ticket.description}</p>
            <p className="text-2xl font-bold text-yellow-300 mb-4">{ticket.price}</p>
        
            <ul className="list-none ">
              {ticket.events.map((event, index) => (
                <li key={index} className="text-white my-[10px] flex  items-center justify-left "><img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png" alt="" className='w-[40px] h-[40px]' /><div className='text-[15px] text-left'>{event}</div></li>
              ))}
            </ul>
            <button onClick={() => {handlebuyNow(ticket.id)}  }  className='mt-5 mx-[15%] bg-slate-900 text-white rounded-[20px] w-[150px] sm:w-[160px] md:w-[200px] h-[40px] text-[25px] '>Buy Now</button>
          </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    <CheckboxPopupMenu/>
    </div>
    )}
    </div>
  );
};

export default TicketSection;
