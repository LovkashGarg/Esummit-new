'use client'
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import './hello.css'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { useEffect,useState } from 'react';
import InfinityLoader from '../components/infinite_loader';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
  const PaymentGateway = () => {
  const {data:session}=useSession()
   const [TransactionId, setTransactionId] = useState('')
   const [ContactNumber, setContactNumber] = useState('')
   const [ScoutId, setScoutId] = useState('');
   const [notification, setNotification] = useState('');

   const handleSubmit=async ()=>{

    if (!session) {
      toast.error('You must need to sign in to buy ticket')
      return;
    }

    const isValidPhoneNumber = /^\d{10}$/.test(ContactNumber);
    if (!isValidPhoneNumber) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }

    console.log(TransactionId);
    console.log(ContactNumber);
    console.log(ScoutId);

    const transactionform=new FormData();
    transactionform.append('TransactionId',TransactionId)
    transactionform.append('ContactNumber', ContactNumber)
    transactionform.append('ScoutId' ,ScoutId);
try {
  const res=await fetch('/api/transaction/create-transaction',{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify({
    email:session?.user.email,
    contactnumber:ContactNumber,
    username:session?.user.name,
    transactionid:TransactionId,
    scoutid:ScoutId
    })
  })
  if (!res.ok) {
    const errorText = await res.json();
    console.log(errorText.error)
    toast.error(`${errorText.error}`)
    throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);

   }

else{
  const result = await res.json();
  console.log(result);

  toast("Ticket booked");
}
} catch (error) {
  console.log(error);
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
    <ToastContainer/>
      <div className='text-[20px] sm:text-[30px] text-center mt-[27%] text-white  sm:mt-[10%]'>Don't Miss a Oppurtunity</div>
      <div className='flex flex-col justify-center items-center gap-[20px] mb-[5%]'>
        <div className='qr-image'>
          <Image
            className='w-[300px] h-[300px] rounded-[40px]'
            src='/QRCODE.jpg' // Use the public directory path
            alt='QR Image'
            width={400} // Define width for Next.js Image
            height={400} // Define height for Next.js Image
          />
        </div>
        <div className='flex flex-col '>
          <input
            className='mx-[20px] sm:mx-[100px] border-[3px] border-black w-[300px] rounded-[20px] px-[20px] text-[20px] text-black'
            type='text'
            placeholder='Enter TransactionID'
            value={TransactionId}
            onChange={(e)=>setTransactionId(e.target.value)}
          />
          <input
            className='mx-[20px] sm:mx-[100px] border-[3px] border-black w-[300px] rounded-[20px] px-[20px] text-[20px] text-black'
            type='text'
            placeholder='Enter Referal_ID'
            value={ScoutId}
            onChange={(e)=>setScoutId(e.target.value)}
          />
          <input
            className='mx-[20px] sm:mx-[100px] border-[3px] border-black w-[300px] rounded-[20px] px-[20px] text-[20px] text-black'
            type='text'
            placeholder='Enter Phone Number'
            value={ContactNumber}
            onChange={(e)=>setContactNumber(e.target.value)}
          />
          <button className='self-center mt-3 bg-green-400 text-white w-[100px] text-[20px] rounded-[20px]' onClick={handleSubmit}>Send</button>
        </div>
      </div>
      
      {/* {notification && <div className='text-red-500'>{notification}</div>}
      <div className='flex items-center justify-center w-[100%]'>
      <div class="slider mt-[20px] mx-[40px] h-[30px] sm:h-[50px] text-black bg-white text-[15px] w-[80%] sm:text-[20px] rounded-[30px]  ">
	<div class="slide-track flex w-[100vw] py-[10px] flex-row gap-[70px] items-center justify-center">
      
      <span>Notification :</span>
      <span>Rahul Bought the ticket</span>
      <span>Sahil Bought the Ticket</span>
      <span>Navjot Bought the Ticke</span>
      <span>Zaid Bought the Ticket</span>
    </div>
    </div> */}
    {/* </div> */}
    <Footer />
    </div>
      )}
      </div>
  );
};

export default PaymentGateway;
