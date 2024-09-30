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
function Navbar({ handleScroll }) {

  const [active, setActive] = useState(null);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  // const [toggleDropdown, setToggleDropdown] =useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])

  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(session?.user.scoutId);
    navigator.clipboard.writeText(session?.user.scoutId);
    setTimeout(() => setCopied(""), 5000);
  }
  return (
    <div className="flex">
      <div className={cn("fixed  sm:top-10  inset-x-0 max-sm:w-full max-w-full mx-auto z-20 top-3  flex justify-between ")}>

        <Sidebar />

        <Image src={logo} priority className="w-[80px] h-[80px]  ml-[40%]  md:w-[80px] md:h-[70px] z-3 md:ml-24 md:m-0" width={100} height={100} alt="logo" ></Image>

        <div className="hidden md:block ml-[15%] max-h-16 " >
          <Menu setActive={setActive} >
            <Link key={1} href="/">
              <MenuItem setActive={setActive} active={active} item="Home">
              </MenuItem>
            </Link>
            <Link key={2} href='/?scrollTo=events'>
                <MenuItem setActive={setActive} active={active} item="Events"></MenuItem>
            </Link>
            <Link key={3} href='/leaderboard'>
              <div >
                <MenuItem setActive={setActive} active={active} item="Leaderboard"></MenuItem>
              </div>
            </Link>
            <Link key={4} href="/payment">
              <MenuItem setActive={setActive} active={active} item="Tickets"></MenuItem>
            </Link>
          </Menu>
        </div>

        <div key={5} className=" md:flex sm:min-w-[330px] sm:mr-8">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
             

              <div className="flex ">

                <img src={session?.user.image} className="hidden md:block md:w-[40px] sm:h-[40px] md:rounded-full md:ml-16" alt="logo" />
                <div className="hidden sm:block sm:text-sm">
                  <p>
                    Your referral ID:
                  </p>
                  <div className="flex gap-x-2">

                    <p className="text-blue-400">
                      {session?.user.scoutId}
                    </p>
                    <div className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgba(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer' onClick={handleCopy}>
                      <Image src={copied === session?.user.scoutId ? '/assets/tick.svg' : '/assets/copy.svg'} width={12} height={12} alt='clicked' />
                    </div>
                  </div>
                </div>

              </div>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                onClick={signOut}
                className=" hidden md:bg-slate-900  md:text-white  md:hover:text-slate-400 md:flex md:items-center md:space-x-2">
                <span>Sign Out</span>
              </HoverBorderGradient>
            </div>

          ) :
            (
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <div key={6} className="flex gap-3 md:gap-5 md:ml-[57%]">
                      <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        onClick={signIn}
                        className="bg-slate-900 text-white hover:text-slate-400 flex items-center space-x-2">
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