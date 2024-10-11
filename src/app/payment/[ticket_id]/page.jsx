'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import './hello.css'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from '../../components/Navbar';
import { useSession } from 'next-auth/react';
import InfinityLoader from '../../components/infinite_loader';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga';

const PaymentGateway = () => {

  const {data: session} = useSession();
  const [TransactionId, setTransactionId] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [ScoutId, setScoutId] = useState('');

  const pathName = usePathname();
  const id = pathName.split('/').pop();
  const searchParams = useSearchParams();
  const events = searchParams.get('events');
  const eventList = events ? events.split(',') : [];

  useEffect(() => {
    const trackingid = "G-XGR3BKX6F5";
    ReactGA.initialize(trackingid);
    // Non-iteration event
    ReactGA.pageview(window.location.pathname);
  }, []);

  const handleSubmit = async () => {

    const QRAmount = {
      '1': 100,
      '2': 200,
      '3': 250,
      '4': 150,
      '5': 50,
      '6': 100,
    };

    const eventMap = {
      '1': 'Startup Survival',
      '2': 'Breaking Convention',
      '3': 'Brand Brawl',
      '4': 'Stadium Showdown',
      '5': 'Lights Out',
      '6': 'OTH',
      '7': 'E summit Junior',
    };

    var eventNames = eventList.map(eventId => eventMap[eventId]);
    console.log('Event Names:- ', eventNames);

    if (id === '2') {
      eventNames = ['Value Pass'];
    }

    if (id === '3') {
      eventNames = ['Maharaja Pass'];
    }

    if (id === '4') {
      eventNames = ['All Online Events'];
    }

    if (id === '1') {
      eventNames = ['Saga Pass'];
    }

    if (!session) {
      toast.error('You must need to sign in to buy ticket');
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

    try {
      const res = await fetch('/api/transaction/create-transaction', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user.email,
          contactnumber: ContactNumber,
          username: session?.user.name,
          transactionid: TransactionId,
          scoutid: ScoutId,
          amount: QRAmount[id],
          eventnames: eventNames
        })
      });

      if (!res.ok) {
        const errorText = await res.json();
        console.log(errorText.error);
        toast.error(`${errorText.error}`);
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      } else {
        const result = await res.json();
        console.log(result);
        toast("Ticket booked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [visits, setVisits] = useState(0);

  useEffect(() => {
    let visitCount = localStorage.getItem('visitCount');
    if (!visitCount) {
      visitCount = 1;
    } else {
      visitCount = parseInt(visitCount) + 1;
    }
    localStorage.setItem('visitCount', visitCount);
    setVisits(visitCount);
  }, []);

  const qrCodeMapping = {
    '2': '/QR/General_QR.jpeg',
    '3': '/QR/General_QR.jpeg',
    '4': '/QR/General_QR.jpeg',
    '6': '/QR/General_QR.jpeg',
  };

  const qrCodeImage = qrCodeMapping[id];

  return (
    <div>
      {loading ? (
        <InfinityLoader />
      ) : (
        <div className='bg-black'>
          <Navbar />
          <ToastContainer />
          <div className='text-[20px] sm:text-[30px] text-center mt-[27%] text-white sm:mt-[10%] font-mono'>Don't Miss the Opportunity</div>
          <div className='flex flex-col justify-center items-center gap-[20px] mb-[5%]'>

            {/* Conditional Rendering for Ticket ID 1 and 5 (Sold Out) */}
            {id === '1' || id === '5' ? (
              <div className='text-red-500 text-center text-2xl'>
                Sold Out
              </div>
            ) : (
              <>
                <div className='qr-image'>
                  <Image
                    className='w-[300px] h-[300px] p-4'
                    src={qrCodeImage}
                    alt='QR Code'
                    width={400}
                    height={400}
                  />
                </div>
                <div className='flex flex-col font-mono'>
                  <input
                    className='mx-[20px] sm:mx-[100px] border-[3px] border-black w-[300px] rounded-[20px] px-[20px] text-[20px] text-black'
                    type='text'
                    placeholder='Enter TransactionID'
                    value={TransactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                  <input
                    className='mx-[20px] sm:mx-[100px] border-[3px] border-black w-[300px] rounded-[20px] px-[20px] text-[20px] text-black'
                    type='text'
                    placeholder='Enter Referral_ID'
                    value={ScoutId}
                    onChange={(e) => setScoutId(e.target.value)}
                  />
                  <input
                    className='mx-[20px] sm:mx-[100px] border-[3px] border-black w-[300px] rounded-[20px] px-[20px] text-[20px] text-black'
                    type='text'
                    placeholder='Enter Phone Number'
                    value={ContactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                  <button className='self-center mt-3 bg-green-400 text-white w-[100px] text-[20px] rounded-[20px]' onClick={handleSubmit}>Send</button>
                </div>
              </>
            )}

          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
