"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { FaPlus } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";


const MotionLink = motion.create(Link);


function Navbar() {
  const pathname = usePathname();

  const disabledRoutes = ["/login", "/signup", "/", "/messages", "/explore", "/videos", "/profile", "/notifications", "/upload"]; 

  if (disabledRoutes.includes(pathname)) {
    return null;
  }

const isActive = (path: string) => pathname === path;


  return (
    <motion.nav className="sticky top-0 left-0 right-0 z-50"
      initial={{ opacity:0 }}
      animate={{ opacity:1, }}
      transition={{ duration:0.5, ease:"easeOut" }}>

      <div className="flex items-center justify-between p-4  bg-white dark:bg-black backdrop-blur-xl">
        <Link href="/" className="text-2xl font-bold">
          <FaPlus />
        </Link>

        <Link href="/">
          <h1 className="font-playwrite text-xl font-bold">
            Light
          </h1>
        </Link>

        <Link href="/notifications" className="text-2xl font-bold">
          {isActive("/feed") ? <FaRegHeart size={28} /> : <FaHeart size={28} />}
        </Link>

      </div>
    </motion.nav>
  );
}

export default Navbar;
