'use client'
import React from 'react'
import Leaderboard from '../components/LeaderBoard'
import { ExpandableCardDemo } from './Expandable_Card_Demo'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import InfinityLoader from '../components/infinite_loader'


const page = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a data fetch with a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timeout
  }, []);
  return (
    <div className='bg-black'>
      {loading ? (
        <InfinityLoader /> // Show loader while loading
      ) : (
        <div className='bg-black'>
          <Navbar />
          <Leaderboard />
          <ExpandableCardDemo />
          <div className='mt-[100px]'></div>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default page