"use client"
import React, { useEffect, useState } from 'react'
import ProfileImage from '../profileImage/profileImage';
import Link from 'next/link'
import { LuUser } from "react-icons/lu";
import { BiBarChartAlt2 } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbLogin2 } from "react-icons/tb";
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { RiHome2Line } from "react-icons/ri";
import { RiContactsBook3Line } from "react-icons/ri";
import { HiOutlineDocument } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(true);
  }
  const hideSidebar = () => {
    setSidebar(false);
  }

  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const temp = await getSession()
      console.log(temp);

      setSession(temp)
    }
    fetchSession()
  }, [])

  return (
    <header>
      <nav className='flex justify-between px-32 items-center h-20 bg-white fixed top-0 right-0 left-0 z-10 shadow-md tablet:px-4 w-screen mobile:px-3'>
        <div>
          <h1 className='text-2xl font-bold'>Omega Mart</h1>
        </div>
        <div className='flex justify-center items-center gap-x-12 text-lg font-semibold mobile tablet:gap-x-5'>
          <Link className='font-medium text-[#3b3a3a] mobile:hidden' href={"/"}>Home</Link>
          <Link className='font-medium text-[#3b3a3a] mobile:hidden' href={"/about"}>About</Link>
          <Link className='font-medium text-[#3b3a3a] mobile:hidden' href={"/contact"}>Contact</Link>
          <div className='flex justify-center items-center gap-x-4'>
            <div style={{ display: session ? "" : "none" }} className='mobile:hidden'>
              <DropdownMenu>
                <DropdownMenuTrigger><LuUser className='text-[26px] relative top-[4px] left-[3px]' /></DropdownMenuTrigger>
                <DropdownMenuContent className='px-2 w-80'>
                  <div className='flex  items-center'>
                    <DropdownMenuLabel className='px-0'>
                      {session?.user?.provider === "github" ? (
                        <img src={session.user.image} className="w-12 h-12 rounded-full" alt="" />
                      ) : session?.user?.name ? (
                        <ProfileImage styles='rounded-full w-10 h-10' name={session.user.name} />
                      ) : (
                        <p>Loading...</p> // Fallback UI when session or user details are not available
                      )}
                    </DropdownMenuLabel>
                    <div className='flex flex-col'>
                      <DropdownMenuLabel className='px-1 text-lg py-0'>{session?.user?.name.length <= 16 ? (session?.user?.name) : (session?.user?.name.slice(0, 16) + "...")}</DropdownMenuLabel>
                      <DropdownMenuLabel className='px-1 py-0 text-sm font-medium text-gray-500'>{session?.user?.email.length <= 25 ? (session?.user?.email) : (session?.user?.email.slice(0, 25) + "...")}</DropdownMenuLabel>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href={"/orders"}>
                    <DropdownMenuItem className='flex items-center text-lg gap-x-3'>
                      <FiShoppingBag className='scale-150' />
                      <p>Orders</p>
                    </DropdownMenuItem>
                  </Link>
                  <Link style={{display: session?.user?.isAdmin ? "block":"none"}} href={"/dashboard/orders"}>
                    <DropdownMenuItem className='flex items-center text-lg gap-x-3'>
                      <BiBarChartAlt2 className='scale-150' />
                      <p>Dashboard</p>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className='flex items-center text-lg gap-x-3' onClick={() => signOut()}>
                    <TbLogout2 className='scale-150' />
                    <p>Logout</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link style={{ display: session ? "none" : "" }} href={"/Login"}><TbLogin2 className='text-[30.5px] cursor-pointer mobile:hidden' /></Link>
            <Link style={{ display: session ? "" : "none" }} href={"/cart"}><HiOutlineShoppingBag className='text-[27px] cursor-pointer' /></Link>
            <FaBars onClick={showSidebar} className="text-2xl hidden mobile:block cursor-pointer" />
          </div>
        </div>
      </nav>
      <nav style={{ transform: sidebar ? "translateX(0%)" : "translateX(100%)" }} id="sidebar" className="flex flex-col items-start px-5 bg-pink fixed top-0 right-0 h-[100vh] w-[100vw] text-lg font-bold transition-all ease-in-out duration-300 z-10 bg-white">
        <RxCross2 onClick={hideSidebar} className="mobile:mt-6 tablet:mt-12 absolute right-3 tablet:right-8 text-4xl cursor-pointer hover:scale-[1.2] transition-transform ease-in-out duration-150" />
        <div className='flex flex-col h-[90vh] justify-between text-3xl font-semibold py-2'>
          <div>
            <div onClick={hideSidebar} className="py-1 mt-20"><Link className='flex items-center gap-x-2' href="/"><RiHome2Line />Home</Link></div>
            <div onClick={hideSidebar} className="py-1"><Link className='flex items-center gap-x-2' href="/about"><HiOutlineDocument />About</Link></div>
            <div onClick={hideSidebar} className="py-1"><Link className='flex items-center gap-x-2' href="/contact"><RiContactsBook3Line />Contact</Link></div>
          </div>
          <div className=''>
            <div style={{ display: session ? "none" : "" }}>
              <div onClick={hideSidebar} className="py-1"><Link className='flex items-center gap-x-2' href={"/Login"}><TbLogin2 />Login</Link></div>
            </div>
            <div style={{ display: session ? "" : "none" }}>
            <div className='flex items-center mb-5 w-[100vw]'>
              <div className='px-0'>
                {session?.user?.provider === "github" ? (
                  <img src={session.user.image} className="w-20 h-20 rounded-full" alt="" />
                ) : session?.user?.name ? (
                  <ProfileImage styles='rounded-full w-14 h-14' name={session.user.name} />
                ) : (
                  <p>Loading...</p> // Fallback UI when session or user details are not available
                )}
              </div>
              <div className='flex flex-col'>
                <div className='px-1 text-2xl py-0'>{session?.user?.name.length <= 16 ? (session?.user?.name) : (session?.user?.name.slice(0, 16) + "...")}</div>
                <div className='px-1 py-0 text-lg font-medium text-gray-500'>{session?.user?.email.length <= 25 ? (session?.user?.email) : (session?.user?.email.slice(0, 25) + "...")}</div>
              </div>
            </div>
              <div onClick={hideSidebar} className="py-1"><Link className='flex items-center gap-x-2' href="/"><FiShoppingBag />Orders</Link></div>
              <div onClick={() => signOut()} className="py-1"><Link className='flex items-center gap-x-2' href="/"><TbLogout2 />Logout</Link></div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar