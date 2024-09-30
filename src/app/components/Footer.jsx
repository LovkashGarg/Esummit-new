"use client"
import React from 'react'
import Link from 'next/link'
import { useEffect ,useState} from 'react';
const Footer = () => {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Retrieve the visit count from localStorage
    let visitCount = localStorage.getItem('visitCount');
    if (!visitCount) {
      // First visit, initialize it
      visitCount = 1;
    } else {
      // Increment the visit count
      visitCount = parseInt(visitCount) + 1;
    }
    // Store updated visit count in localStorage
    localStorage.setItem('visitCount', visitCount);
    setVisits(visitCount);
  }, []);

  return (
    <footer className="bg-black text-gray-400 py-12">
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
      <p className="mb-4">
      E-Summit is an annual entrepreneurial event organized by the Entrepreneurship Cell of the IIIT Pune. It serves as a platform to encourage innovation, startup culture, and entrepreneurial mindset among students and aspiring entrepreneurs.
      </p>
    </div>
    <div >
      <h2 className="text-white text-lg font-semibold mb-4 ">Quick Links</h2>
      <ul>
        <li>
          <Link
            href="/"
            className="hover:text-white transition-colors duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/?scrollTo=events"
            className="hover:text-white transition-colors duration-300"
          >
          Events
          </Link>
        </li>
        <li>
          <Link
            href="/leaderboard"
            className="hover:text-white transition-colors duration-300"
          >
            LeaderBoard
          </Link>
        </li>
        <li>
          <Link
            href="/payment"
            className="hover:text-white transition-colors duration-300"
          >
            Tickets
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
      <div className="flex space-x-4">
        <a
          href="https://www.youtube.com/channel/UCBRfXeWo-YSFt25wlZGr30w"
          className="hover:text-white transition-colors duration-300"
        >
          Youtube
        </a>
        <Link          href="https://www.linkedin.com/company/e-cell-iiit-pune/mycompany/"
          className="hover:text-white transition-colors duration-300"
        >
          Linkedin
        </Link>
        <a
          href="https://www.instagram.com/ecell_iiitp/"
          className="hover:text-white transition-colors duration-300"
        >
          Instagram
        </a>
      </div>
      <div>
        Total Visitors :{ visits}
      </div>
    </div>
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
      <h3><strong>Tanmay Khaitan</strong></h3>
      {/* <p>Pune 411041</p> */}
      <a href={`mailto:ecell@iiitp.ac.in`}>Email: ecell@iiitp.ac.in</a>
      {/* <h1>Any technical Issues</h1> */}
      <p>Phone: +919784306503</p>
      <div className='flex gap-5'><strong>Lovkash Garg</strong>    <a className='underline' href={`https://www.linkedin.com/in/lovkashgarg/`}><ul>Linkedin</ul></a></div>
      <div className='flex gap-5'><strong>Nikhil Prajapati</strong><a className='underline' href={`mailto:nikhilpraj@gmail.com`}>Linkedin</a></div>   
      <div className='flex gap-5'><strong>Garv Jauhri</strong>   {/* <p>Pune 411041</p> */}
      <a className='underline' href={`https://www.linkedin.com/in/garv-jauhari-6726162b4/`}><ul>Linkedin</ul></a></div>
   
    </div>
    </div>
    <p className="text-center text-[15px] sm:text-[25px] pt-8">© 2024 Ecell. All rights reserved.</p>
</footer>   
  )
}

export default Footer