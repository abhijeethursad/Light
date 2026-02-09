"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaBolt } from "react-icons/fa";
import { easeInOut } from "framer-motion";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 50 }
  },
};

const glowVariants = {
  initial: { opacity: 0.4, scale: 0.8 },
  animate: { 
    opacity: [0.3, 0.6, 0.3], 
    scale: [1, 1.2, 1],
    transition: { duration: 4, repeat: Infinity, ease: easeInOut }
  }
};

export default function Home() {
  return (
    // 1. Base Styles: bg-gray-50 (Light) / dark:bg-black (Dark)
    <motion.div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden font-sans select-none 
                    bg-gray-50 text-gray-900 
                    dark:bg-black dark:text-white transition-colors duration-500"
    initial={{ opacity:0 }}
    animate={{ opacity:1, }}
    transition={{ duration:0.5, ease:"easeOut" }}>
      
      {/* --- BACKGROUND EFFECTS --- */}
      
      {/* Top Left Glow - Purple */}
      <motion.div 
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none
                   bg-indigo-300/40 dark:bg-indigo-900/30" // Lighter purple in light mode
      />
      
      {/* Bottom Right Glow - Blue */}
      <motion.div 
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none
                   bg-blue-300/40 dark:bg-blue-900/30" // Lighter blue in light mode
      />

      {/* --- MAIN CONTENT --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center text-center px-6 max-w-2xl"
      >
        
        {/* 1. Icon / Logo */}
        <motion.div variants={itemVariants} className="mb-6">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl
                            bg-black text-white 
                            dark:bg-white dark:text-black
                            shadow-gray-400/50 dark:shadow-white/20">
                <FaBolt className="text-4xl" />
            </div>
        </motion.div>

        {/* 2. Title "Light" */}
        <motion.h1 variants={itemVariants} className=" tracking-tighter mb-2">
          {/* Gradient Text: Black->Gray (Light) | White->Gray (Dark) */}
          <span className="text-transparent bg-clip-text bg-gradient-to-b drop-shadow-lg
                           from-black via-gray-800 to-gray-500
                           dark:from-white dark:via-gray-100 dark:to-gray-500 font-playwrite text-8xl">
            Light
          </span>
        </motion.h1>

        {/* 3. Subtitle */}
        <motion.p variants={itemVariants} className="text-lg md:text-xl mb-10 leading-relaxed
                                                     text-gray-600 dark:text-gray-400">
          The fastest way to share your moments. <br className="hidden md:block"/> 
          Illuminate your world with one tap.
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            
            {/* Primary Button (Get Started) */}
            {/* Inverts Colors: Black Background in Light Mode, White in Dark Mode */}
            <Link href="/feed">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 w-full sm:w-auto transition-all shadow-lg
                           bg-black text-white hover:bg-gray-800 hover:shadow-gray-500/30
                           dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:hover:shadow-white/20"
              >
                <span>Get Started</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            {/* Secondary Button (Log In) */}
            <Link href="/login">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(128,128,128,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border rounded-full font-bold text-lg w-full sm:w-auto transition-colors
                           border-gray-300 text-gray-800 hover:border-black
                           dark:border-gray-700 dark:text-white dark:hover:border-white"
              >
                Log In
              </motion.button>
            </Link>

        </motion.div>

      </motion.div>

      {/* --- FOOTER --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 text-xs tracking-widest uppercase
                   text-gray-500 dark:text-gray-600"
      >
        Light Social © 2026
      </motion.div>

    </motion.div>
  );
}