import React from 'react';
import Link from 'next/link';
export function Sidebar() {
  return (
    <div
      className={`fixed top-0 z-10 left-0 h-full bg-black text-white w-40 transform  translate-x-0 transition-transform duration-300 ease-in-out z-50 className='  block sm:hidden`}
    >
      <div className="p-4 flex justify-between">
        ESummit
        <button className="text-white focus:outline-none">
          X
        </button>
      </div>
      <ul className="mt-6">
        <li className="p-4 hover:bg-black"><Link href='/'>Home</Link></li>
        <li className="p-4 hover:bg-black"><Link href='/payment'>Tickets</Link></li>
        <li className="p-4 hover:bg-black"><Link href='/leaderboard'>Leaderboard </Link></li>
        <li className="p-4 hover:bg-black">Events</li>
      </ul>
    </div>
  );
}
