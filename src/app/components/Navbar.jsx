'use client'
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../utils/cn";
import Link from "next/link";
import { Button } from "./ui/moving-border";
import Image from "next/image";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import logo from "../../../public/courses/E-Cell logo Yellow-white.png"
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Sidebar } from "./menu_bar";
function Navbar({handleScroll}) {

  const [active, setActive] = useState(null);
  const{ data:session}=useSession();
  const [providers,setProviders]=useState(null);
  // const [toggleDropdown, setToggleDropdown] =useState(false);
  useEffect(()=>{
    const setUpProviders=async ()=>{
      const response=await getProviders();
      setProviders(response);
    }
    
    setUpProviders();
  },[])
  const [copied, setCopied] = useState("");
  const handleCopy=()=>{
    setCopied(session?.user.scoutId);
    navigator.clipboard.writeText(session?.user.scoutId);
    setTimeout(()=>setCopied(""),5000);
  }
  return (
    <div className="flex">
      <Sidebar  />
    <div className={cn("fixed top-20 sm:top-10   inset-x-0 max-sm:w-full max-w-full mx-auto z-50 flex justify-around ")}>
      
      <Image src={logo} priority className="top-20 w-[80px] h-[80px] md:w-[100px] md:h-[100px] z-3  " width={100} height={100} alt="logo" />
    
       <div className="mr-8 hidden flex flex-col items-center justify-center md:block" >

      <Menu setActive={setActive} >
        <Link key={1} href="/">
          <MenuItem setActive={setActive} active={active} item="Home">
          </MenuItem>
        </Link>
        <Link  key={2} href='/' >
        <div onClick={()=>handleScroll('events')} >
        <MenuItem  setActive={setActive} active={active} item="Events"></MenuItem>
        </div>
        </Link>
        <Link key={3} href='/leaderboard'>
       <div >
        <MenuItem setActive={setActive} active={active} item="LeaderBoard"></MenuItem>
       </div>
       </Link>
       <Link key={4} href="/payment">
        <MenuItem setActive={setActive} active={active} item="Tickets"></MenuItem>
        </Link>
      </Menu>
</div>

      <div key={5} className="hidden md:flex md:block">
      { session?.user ?(
        <div className="flex gap-3 md:gap-5">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                onClick={signOut}
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2">
                <span>Sign Out</span>
              </HoverBorderGradient>
              
              <div >

              <img src={session?.user.image} className=" w-[50px] h-[50px]  sm:w-[50px] sm:h-[50px] rounded-full ml-16"  alt="logo"/>
              <div> 
                <p>
                Your referral ID:
                  </p>
                  <div className="flex gap-x-2">

                  <p className="text-blue-400">
              {session?.user.scoutId} 
                </p>
                <div className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgba(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer' onClick={handleCopy}>
                 <Image src={copied===session?.user.scoutId ? '/assets/tick.svg':'/assets/copy.svg'} width={12} height={12} alt='clicked'/>
                     </div>
                  </div>
                </div>

                </div>
      </div>
                
        ):
        (
          <>
         {providers && 
          Object.values(providers).map((provider)=>(
            <div key={6} className="flex gap-3 md:gap-5">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                onClick={signIn}
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2">
                <span>Sign In </span>
              </HoverBorderGradient>
                
        </div>
          ))
         }
          </>
        )
       }
      
      </div>
    </div>
      </div>

  )
}

export default Navbar;
