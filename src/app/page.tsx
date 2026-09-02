"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaBolt } from "react-icons/fa";
import { easeInOut } from "framer-motion";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 20 }
  },
};

const floatingLogoVariants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 4, repeat: Infinity, ease: easeInOut }
  }
};

const glowVariants = {
  initial: { opacity: 0.3, scale: 0.8 },
  animate: { 
    opacity: [0.3, 0.5, 0.3], 
    scale: [1, 1.1, 1],
    transition: { duration: 5, repeat: Infinity, ease: easeInOut }
  }
};

export default function Home() {
  return (
    <motion.div 
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden font-sans select-none 
                 bg-[#fafafa] text-gray-900 
                 dark:bg-[#050505] dark:text-white transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      
      {/* --- PREMIUM BACKGROUND EFFECTS --- */}
      
      {/* Subtle Grid Pattern (Fades out at the bottom) */}
      <div className="absolute inset-0 pointer-events-none 
                      bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
                      bg-[size:24px_24px] 
                      [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* Top Left Glow - Purple/Pink */}
      <motion.div 
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none
                   bg-indigo-400/20 dark:bg-indigo-600/20" 
      />
      
      {/* Bottom Right Glow - Blue/Cyan */}
      <motion.div 
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none
                   bg-blue-400/20 dark:bg-cyan-600/20" 
      />

      {/* --- MAIN CONTENT --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center text-center px-6 max-w-2xl"
      >
        
        {/* 1. Floating Logo */}
        <motion.div variants={itemVariants} className="mb-8">
            <motion.div 
              variants={floatingLogoVariants}
              initial="initial"
              animate="animate"
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl relative
                         bg-black text-white 
                         dark:bg-white dark:text-black
                         shadow-black/20 dark:shadow-white/10 border border-black/5 dark:border-white/10"
            >
                {/* Inner subtle glow for the logo box */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 dark:ring-black/10"></div>
                <FaBolt className="text-4xl relative z-10" />
            </motion.div>
        </motion.div>

        {/* 2. Title "Light" with Animated Shimmer */}
        <motion.h1 variants={itemVariants} className="tracking-tighter">
          <span className="text-transparent bg-clip-text drop-shadow-sm font-playwrite text-8xl md:text-9xl
                         bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900
                         dark:from-white dark:via-gray-400 dark:to-white
                         bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]"
          >
            Light
          </span>
        </motion.h1>

        {/* 3. Subtitle */}
        <motion.p variants={itemVariants} className="mt-12 md:mt-18 text-lg md:text-xl mb-12 leading-relaxed font-medium
                                                     text-gray-500 dark:text-gray-400 max-w-md">
          The fastest way to share your moments. <br className="hidden md:block"/> 
          Illuminate your world with one tap.
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            
            {/* Primary Button (Get Started) */}
            <Link href="/feed" className="w-full sm:w-auto">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-4 rounded-full font-bold text-[17px] flex items-center justify-center gap-3 transition-all shadow-xl cursor-pointer
                           bg-black text-white shadow-black/20 hover:shadow-black/40
                           dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:shadow-white/25"
              >
                <span>Get Started</span>
                <FaArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.div>
            </Link>

            {/* Secondary Button (Log In) */}
            <Link href="/login" className="w-full sm:w-auto">
              <motion.div 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(128,128,128,0.05)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full font-bold text-[17px] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm
                           border border-gray-300/80 text-gray-700 hover:border-gray-900 hover:text-gray-900
                           dark:border-white/20 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
              >
                Log In
              </motion.div>
            </Link>

        </motion.div>

      </motion.div>

      {/* --- FOOTER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 text-xs font-semibold tracking-widest uppercase
                   text-gray-400 dark:text-gray-500"
      >
        Light Social © 2026
      </motion.div>

    </motion.div>
  );
}