import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
// import { Checkmark } from 'react-checkmark'
import Link from 'next/link';

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
      events: ['ACCESS TO ANY ALL 8 EVENTS', 'BEST VALUE','STARTUP SAGA INCLUDED']
    },
    {
      id: 3,
      title: 'FLEXI PASS',
      price: '₹100',
      color:"#c25b56",
      description: 'Discounted rate for students.',
      events: ['ACCESS TO ANY THREE OFFLINE EVENTS', 'Music Festival']
    },
  
  ];

  return (
    <div className='bg-black'>
    <Navbar/>
    <div className="mt-[200px] sm:mt-[100px]  max-w-7xl mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-12 ">Choose Your Tickets</h2>
      
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
            <button className='mt-5 bg-slate-900 text-white rounded-[20px] w-[150px] sm:w-[160px] md:w-[200px] h-[40px] text-[25px] '><Link href={`/payment/${ticket.id}`} >Buy Now</Link></button>
          </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
<<<<<<< HEAD
=======
 
>>>>>>> a0f8a64aacd19e7c0d6d34f87df1af5840e7adf7
  );
};

export default TicketSection;
