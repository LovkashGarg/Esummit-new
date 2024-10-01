"use client"
import React from 'react'
import Link from 'next/link'
// import { useEffect ,useState} from 'react';
const Footer = ({visitorscount}) => {
  // const [visits, setVisits] = useState(visitCount);

  // useEffect(() => {
  //   // Retrieve the visit count from localStorage
  //   // let visitCount = localStorage.getItem('visitCount');
  //   if (!visitCount) {
  //     // First visit, initialize it
  //     visitCount = 1;
  //   } else {
  //     // Increment the visit count
  //     visitCount = parseInt(visitCount) + 1;
  //   }
  //   // Store updated visit count in localStorage
  //   localStorage.setItem('visitCount', visitCount);
  //   setVisits(visitCount);
  // }, []);

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
            <Link href="https://www.linkedin.com/company/e-cell-iiit-pune/mycompany/"
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
            Total Visitors :{visitorscount}
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <h3><strong>Tanmay Khaitan</strong></h3>
          {/* <p>Pune 411041</p> */}
          Email: 
          <a href={`mailto:ecell@iiitp.ac.in`} className='text-blue-500 underline'>ecell@iiitp.ac.in</a>
          {/* <h1>Any technical Issues</h1> */}
          <p><a href="tel:+919784306503" className="text-blue-500 underline">+91 9784306503</a></p>
          <div className='flex justify-between w-[80%]'><strong>Nikhil Prajapati</strong><a className='underline text-blue-500' href={`https://www.linkedin.com/in/nikhil-prajapati-883716287`}>Linkedin</a></div>
          <p>
            <a href="tel:+919016377536" className="text-blue-500 underline">+91 9016377536</a>
            </p>
          <div className='flex justify-between w-[80%]'><strong>Lovkash Garg</strong>
            <a className='underline text-blue-500' href={`https://www.linkedin.com/in/lovkashgarg/`}>
              <ul>Linkedin</ul>
            </a>
          </div>
          <p>
            <a href="tel:+919896316033" className="text-blue-500 underline">+91 9896316033</a>
          </p>
          <div className='flex justify-between w-[80%]'><strong>Garv Jauhri</strong>   {/* <p>Pune 411041</p> */}
            <a className='underline text-blue-500' href={`https://www.linkedin.com/in/garv-jauhari-6726162b4/`}>
            <ul>Linkedin</ul>
            </a>
            </div>
          <p>
            <a href="tel:+916307129301" className="text-blue-500 underline">+91 6307129301</a></p>

        </div>
      </div>
      <p className="text-center text-[15px] sm:text-[25px] pt-8">© 2024 Ecell. All rights reserved.</p>
    </footer>
  )
}

export default Footer