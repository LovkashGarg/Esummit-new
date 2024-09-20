import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const PaymentGateway = () => {
  return (
    <>
      <div className='text-[40px] text-center'>Payment For Tickets</div>
      <div className='flex flex-col justify-center items-center gap-[20px]'>
        <div className='qr-image'>
          <Image
            className='w-[400px] h-[400px] rounded-[40px]'
            src='/QRCODE.jpg' // Use the public directory path
            alt='QR Image'
            width={400} // Define width for Next.js Image
            height={400} // Define height for Next.js Image
          />
        </div>
        <div>
          <input
            className='border-[3px] border-black w-[400px] rounded-[20px] px-[20px] text-[25px] text-black'
            type='text'
            placeholder='Enter TransactionID'
          />
          <button className='bg-green-400 text-white w-[100px] text-[25px] rounded-[20px]'>Send</button>
        </div>
      </div>
      <div className='Notifications text-red-500 text-[25px] text-center'>
        Rahul Dixit Recently registered
      </div>
    </>
  );
};

export default PaymentGateway;
