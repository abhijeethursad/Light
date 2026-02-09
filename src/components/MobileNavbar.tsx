"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { usePathname } from "next/navigation";
import { GoHomeFill, GoHome } from "react-icons/go";
import { PiPaperPlaneTilt, PiPaperPlaneTiltFill } from "react-icons/pi";
import { FaUser, FaRegUser } from "react-icons/fa";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { IoPlayCircleSharp } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";


const MotionLink = motion.create(Link);


function MobileNavbar() {
  const pathname = usePathname();

  const disabledRoutes = ["/login", "/signup", "/", "/notifications"]; 


  if (disabledRoutes.includes(pathname)) {
    return null;
  }

  const isActive = (path: string) => pathname === path;

  return (
    <motion.div className="fixed bottom-0 left-0 right-0 z-50 "
      initial={{ opacity:0 }}
      animate={{ opacity:1, }}
      transition={{ duration:0.5, ease:"easeOut" }}>

      <div className="flex items-center justify-between px-4 py-4 border-t border-gray-300 bg-white dark:bg-black backdrop-blur-xl dark:border-gray-700">
        
        {/* Feed */}
        <MotionLink href="/feed"
          whileTap={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}>
          {isActive("/feed") ? <GoHomeFill size={28} /> : <GoHome size={28} />}
        </MotionLink>

        {/* Videos */}
        <MotionLink href="/videos"
          whileTap={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}>
          {isActive("/videos") ? <IoPlayCircleSharp size={28} /> : <IoPlayCircleOutline size={28} />}
        </MotionLink>

        {/* Messages */}
        <MotionLink href="/messages"
          whileTap={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}>
          {isActive("/messages") ? <PiPaperPlaneTiltFill size={26} /> : <PiPaperPlaneTilt size={26} />}
        </MotionLink>

        {/* Explore */}
        <MotionLink href="/explore"
          whileTap={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}>
          {isActive("/explore") ? <MdExplore size={28} /> : <MdOutlineExplore size={28} />}
        </MotionLink>

        {/* Profile */}
        <MotionLink href="/profile"
          whileTap={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}>
          {isActive("/profile") ? <FaUser size={23} /> : <FaRegUser size={23} />}
        </MotionLink>

      </div>
    </motion.div>
  );
}

export default MobileNavbar;