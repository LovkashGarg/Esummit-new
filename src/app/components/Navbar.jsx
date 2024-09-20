'use client'
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../utils/cn";
import Link from "next/link";
import { Button } from "./ui/moving-border";
import Image from "next/image";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import logo from "../../../public/courses/E-Cell logo Yellow-white.png"
function Navbar() {

  const [active, setActive] = useState(null);
  const{ data:session}=useSession();
  const [providers,setProviders]=useState(null);
  const [toggleDropdown, setToggleDropdown] =useState(false);
  useEffect(()=>{
    const setUpProviders=async ()=>{
      const response=await getProviders();
      setProviders(response);
    }
    
    setUpProviders();
  },[])

  return (
    <div className="flex">
    <div className={cn("fixed top-10 inset-x-0 max-sm:w-full max-w-full mx-auto z-50 flex justify-around ")}>
      
      <Image src={logo} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]  " width={100} height={100} alt="logo" />
    
<div className="pl-48 hidden flex flex-col items-center justify-center md:block" >

      <Menu setActive={setActive} >
        <Link href="/">
          <MenuItem setActive={setActive} active={active} item="Home">
          </MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item="Events"></MenuItem>
        <MenuItem setActive={setActive} active={active} item="About Us"></MenuItem>
        <MenuItem setActive={setActive} active={active} item="Tickets"></MenuItem>
        <Link href="/contact">
          <MenuItem setActive={setActive} active={active} item="Contact Us"></MenuItem>
        </Link>
      </Menu>
</div>

      <div className="hidden md:flex md:block">
      { session?.user ?(
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
          </Link>

          <button type="button" onClick={signOut} >
            Sign Out  
          </button>

          <Link href="/profile">
          {/* <Image className="rounded-full" src="/assests/images/logo.svg" width={37} height={37} alt="profile"/> */}
          </Link>
        </div>
        ):
        (
          <>
         {providers && 
          Object.values(providers).map((provider)=>(
            <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} >
              SignIn
            </button>
          ))
         }
          </>
        )
       }
      <Link href='/signup'>
      <Button className="text-[20px] h-[50px] w-[130px] px-[20px]" borderRadius="1.75rem" >Login </Button>
      </Link>
      <Link href='/signup'><Button className="text-[20px] h-[50px]  w-[130px]" borderRadius="1.75rem" >Sign Up</Button></Link> 
      </div>
    </div>
      </div>

  )
}

export default Navbar;