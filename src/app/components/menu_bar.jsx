"use client"
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
export function Sidebar() {
   const [sideBaropen, setsideBaropen] = useState(false)
  const handletoggle=()=>{
    setsideBaropen(!sideBaropen);
  }
  return (
    <>
    <button  onClick={handletoggle} className={`${!sideBaropen? 'block' : 'hidden'} text-start p-[20px] bg-black text-white text-[20px] sm:text-[25px] w-full sm:hidden`}>Menu</button>
    <div
  className={`fixed top-0 z-10 left-0 h-full bg-black text-white w-40 transform ${sideBaropen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 ${sideBaropen? 'block' : 'hidden'} sm:hidden`}
>
      <div className="p-4 text-[20px] flex justify-between">
        ESummit
        <button onClick={handletoggle} className="text-red-400 focus:outline-none">
          X
        </button>
      </div>
      <ul className="mt-6">
        <li className="text-[20px] p-4 hover:bg-black"><Link href='/'>Home</Link></li>
        <li className="text-[20px] p-4 hover:bg-black"><Link href='/payment'>Tickets</Link></li>
        <li className="text-[20px] p-4 hover:bg-black"><Link href='/leaderboard'>Leaderboard </Link></li>
        <li className="text-[20px] p-4 hover:bg-black"><Link href='/'>Events</Link></li>
        <li className="text-[20px] p-4 hover:bg-black">Sign Out</li>
      </ul>
    </div>
    </>
  );
}
