import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import './hello.css'
import Navbar from '../components/Navbar';
const PaymentGateway = () => {
  
  return (
    <>
    <Navbar/>
      <div className='text-[30px] text-center mt-[120px]'>Payment Section</div>
      <div className='flex flex-col justify-center items-center gap-[20px]'>
        <div className='qr-image'>
          <Image
            className='w-[300px] h-[300px] rounded-[40px]'
            src='/QRCODE.jpg' // Use the public directory path
            alt='QR Image'
            width={400} // Define width for Next.js Image
            height={400} // Define height for Next.js Image
          />
        </div>
        <div className='flex flex-col'>
          <input
            className='border-[3px] border-black w-[400px] rounded-[20px] px-[20px] text-[20px] text-black'
            type='text'
            placeholder='Enter TransactionID'
          />
          <input
            className='border-[3px] border-black w-[400px] rounded-[20px] px-[20px] text-[20px] text-black'
            type='text'
            placeholder='Enter Referal_ID'
          />
          <input
            className='border-[3px] border-black w-[400px] rounded-[20px] px-[20px] text-[20px] text-black'
            type='text'
            placeholder='Enter Phone Number'
          />
          <button className='self-center mt-3 bg-green-400 text-white w-[100px] text-[20px] rounded-[20px]'>Send</button>
        </div>
      </div>
      <div class="slider mt-[20px]  text-red-500 bg-white text-[25px] rounded-[30px]  ">
	<div class="slide-track flex flex-row gap-[100px] items-center justify-center">
    <div className='slide'>
      Rahul Bought the Ticket
    </div>
    <div className='slide'>
      Sahil Bought the Ticket
    </div>
    <div className='slide'>
      Navjot Bought the Ticket
    </div>
    <div className='slide'>
      Zaid Bought the Ticket
    </div>
    </div>
    </div>
    </>
  );
};

export default PaymentGateway;
