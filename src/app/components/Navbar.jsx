  'use client';
  import React, { useState, useEffect } from "react";
  import { Menu, MenuItem } from "./ui/navbar-menu";
  import { cn } from "../utils/cn";
  import Link from "next/link";
  import Image from "next/image";
  import { signOut } from "next-auth/react";
  import logo from "../../../public/courses/E-Cell logo Yellow-white.png";
  import { HoverBorderGradient } from "./ui/hover-border-gradient";
  import { Sidebar } from "./menu_bar";
  import { jwtDecode } from "jwt-decode"; // Import jwt-decode for decoding JWT
  import { useSession } from "next-auth/react"; // Use NextAuth for session management
  import { useRouter } from "next/navigation";

  function Navbar({ handleScroll }) {
    const router = useRouter();
    const { data: session } = useSession(); // NextAuth session data
    const [active, setActive] = useState(null);
    const [copied, setCopied] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [sessionUser, setSessionUser] = useState(null); // To store session user details
    useEffect(() => {
      // Check if JWT token exists for admin sign-in
      const token = localStorage.getItem('jwtToken');
    
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decode JWT token
          setSessionUser(decodedToken); // Set user data from JWT
          setIsAdmin(decodedToken?.role !== "user"); // Check if the user is an admin
        } catch (error) {
          console.error("Error decoding JWT token:", error);
        }
      } else if (session) {
        // If session is available, check the user's role
        setIsAdmin(session?.user?.role !== "user");
      } else {
        // If no token or session, user is not authenticated
        setIsAdmin(false);
      }
    }, [session]);

  
    const handleCopy = () => {
      setCopied(sessionUser?.scoutId || session?.user?.scoutId); // Fallback to general session's scoutId
      navigator.clipboard.writeText(sessionUser?.scoutId || session?.user?.scoutId);
      setTimeout(() => setCopied(""), 5000);
    };

    const handleSignOut = () => {
      // Remove the JWT token and session data on sign-out
      localStorage.removeItem('jwtToken');
      signOut(); // Sign out from NextAuth
      router.push("/"); // Redirect to login page
    };

    return (
      <div className="flex">
        <div
          className={cn(
            "fixed sm:top-10 inset-x-0 max-sm:w-full max-w-full mx-auto z-20 top-3 flex justify-between"
          )}
        >
          {/* Sidebar */}
          <Sidebar />

          {/* Logo */}
          <Image
            src={logo}
            priority
            className="w-[80px] h-[80px] ml-[40%] md:w-[80px] md:h-[70px] z-3 md:ml-24 md:m-0"
            width={100}
            height={100}
            alt="logo"
          />

          {/* Navbar Menu */}
          <div className="hidden md:block ml-[15%] max-h-16">
            <Menu setActive={setActive}>
              <Link key={1} href="/">
                <MenuItem setActive={setActive} active={active} item="Home" />
              </Link>
              <Link key={2} href="/?scrollTo=events">
                <MenuItem setActive={setActive} active={active} item="Events" />
              </Link>
              <Link key={3} href="/leaderboard">
                <MenuItem setActive={setActive} active={active} item="Leaderboard" />
              </Link>
              <Link key={4} href="/payment">
                <MenuItem setActive={setActive} active={active} item="Tickets" />
              </Link>
              {isAdmin && (
                <Link key={5} href="/admin">
                  <MenuItem setActive={setActive} active={active} item="Dashboard" />
                </Link>
              )}
            </Menu>
          </div>

          {/* Right Section */}
          <div key={6} className="md:flex sm:min-w-[330px] sm:mr-8">
            {sessionUser || session ? (
              <div className="flex gap-3 md:gap-5">
                <div className="flex">
                  <img
                    src={sessionUser?.image || session?.user?.image || '/assets/Default-Profile-Picture-PNG-Free-Download.png'} // Fallback to session image
                    className="hidden md:block md:w-[40px] sm:h-[40px] md:rounded-full md:ml-16"
                    alt="profile"
                  />
                <div className="hidden sm:block sm:text-sm text-white">
    {sessionUser?.role === "user" || session?.user?.role === "user" ? ( // Check if the role is 'user'
      <>
        <p>Your referral ID:</p>
        <div className="flex gap-x-2">
          <p className="text-blue-400">{sessionUser?.scoutId || session?.user?.scoutId}</p>
          <div
            className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgba(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
            onClick={handleCopy}
          >
            <Image
              src={
                copied === (sessionUser?.scoutId || session?.user?.scoutId)
                  ? "/assets/tick.svg"
                  : "/assets/copy.svg"
              }
              width={12}
              height={12}
              alt="copy"
            />
          </div>
        </div>
      </>
    ) : (
      // For "admin" role
      <div className="ml-2">
    <p className=" font-semibold">Welcome,</p>
    <p className="text-lg font-bold underline text-blue-500 decoration-white/50 decoration-2">Admin</p>
  </div>
    )}
  </div>
                </div>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  onClick={handleSignOut}
                  className="hidden md:bg-slate-900 md:text-white md:hover:text-slate-400 md:flex md:items-center md:space-x-2"
                >
                  <span>Sign Out</span>
                </HoverBorderGradient>
              </div>
            ) : (
              <div
                key={7}
                className="flex mr-[10px] mt-[5px] gap-3 md:gap-5 md:ml-[57%]"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  onClick={() => router.push("/RoleSelection")}
                  className="bg-slate-900 text-white hover:text-slate-400 flex items-center space-x-2"
                >
                  <span>Sign In</span>
                </HoverBorderGradient>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default Navbar;
