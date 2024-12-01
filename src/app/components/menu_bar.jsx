"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { MenuItem } from "./ui/navbar-menu";
export function Sidebar() {

  const router = useRouter();
  const [active, setActive] = useState(null);
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [sideBaropen, setsideBaropen] = useState(false);
  const [providers, setProviders] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  useEffect(() => {
    // Check if JWT token exists for admin sign-in
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode JWT token
        setSessionUser(decodedToken); // Set user data from JWT
        setIsAdmin(decodedToken?.role === "admin"); // Check if the user is an admin
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }
  }, []);

  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(session?.user.scoutId);
    navigator.clipboard.writeText(session?.user.scoutId);
    setTimeout(() => setCopied(""), 5000);
  };

  const handletoggle = () => {
    setsideBaropen(!sideBaropen);
  };

  const handleSignOut = () => {
    // Remove the JWT token and session data on sign-out
    localStorage.removeItem('jwtToken');
    signOut(); // Sign out from NextAuth
    router.push("/"); // Redirect to login page
  };
  return (
    <>
      <button
        onClick={handletoggle}
        className={`${!sideBaropen ? "block" : "hidden"}  fixed top-4 left-4 z-50 text-start px-4 py-2 bg-transparent bg-transparent  sm:hidden `}
      >
        <img
          className="w-[40px] h-[30px] object-cover"
          src="/assets/menu-removebg-preview.png"></img>
      </button>
      <div
        className={`fixed top-0 z-10 left-0 h-full bg-black text-white w-40 transform ${
          sideBaropen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 ${
          sideBaropen ? "block" : "hidden"
        } sm:hidden`}
      >
        <div className="p-4 text-[20px] flex justify-between">
          ESummit
          <button onClick={handletoggle} className="text-red-400 focus:outline-none">
            X
          </button>
        </div>
        <ul className="mt-6 ">
          <li className="text-[20px] p-4 hover:bg-black">
            <Link href="/">Home</Link>
          </li>
          <li className="text-[20px] p-4 hover:bg-black">
            <Link href="/payment">Tickets</Link>
          </li>
          <li className="text-[20px] p-4 hover:bg-black">
            <Link href="/leaderboard">Leaderboard </Link>
          </li>
          <li className="text-[20px] p-4 hover:bg-black">
            <Link href="/?scrollTo=events">Events</Link>
          </li>
          {isAdmin && (
              <li className="text-[20px] p-4 hover:bg-black">
                <Link setActive={setActive} active={active}  href="/admin">Dashboard</Link>
              </li>
            )}
        </ul>

        <div className="ml-2 h-screen flex flex-col">
          {sessionUser || session ? (
            <div className="flex flex-col justify-between h-full">
              <div className="pb-4">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  onClick={handleSignOut}
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                  <span>Sign Out</span>
                </HoverBorderGradient>
              </div>

              <div className="mt-auto pb-4 absolute bottom-0 w-full ">
                <div className="flex flex-col ">
                  <img
                    src={sessionUser?.image || session?.user?.image} 
                    className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] rounded-full"
                    alt="logo"
                  />
                  <div className="mt-2">
                    <p>Your referral ID:</p>
                    <div className="flex gap-x-2">
                      <p className="text-blue-400">{sessionUser?.scoutId || session?.user?.scoutId}</p>
                      <div
                        className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgba(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
                        onClick={handleCopy}
                      >
                        <Image
                          src={copied === (sessionUser?.scoutId || session?.user?.scoutId) ? "/assets/tick.svg" : "/assets/copy.svg"}
                          width={12}
                          height={12}
                          alt="clicked"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <div key={6} className="flex">
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      as="button"
                      onClick={signIn}
                      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                    >
                      <span>Sign In</span>
                    </HoverBorderGradient>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}