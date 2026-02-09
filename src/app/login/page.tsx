"use client";
import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { motion} from "framer-motion"


function LoginPage() {
  return (
      <motion.div className="flex flex-col justify-center items-center min-h-screen
                       from-white via-purple-400/40 to-white
                      bg-gradient-to-bl dark:from-black dark:via-purple-700/20 dark:to-black 
                      p-4 backdrop-blur-3xl"
        initial={{ opacity:0 }}
        animate={{ opacity:1, }}
        transition={{ duration:0.5, ease:"easeOut" }}
        >

        <div className="md:shadow-lg md:border md:border-gray-200 md:dark:border-gray-700
                        rounded-xl p-8 w-full h-full  sm:w-100 md:backdrop-blur-3xl bg-transparent">

          <form action="">
            <div className='flex items-center justify-center text-3xl font-playwrite mb-4'>
              Light
            </div>

            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl mb-2">
                Welcome back!
              </h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-md text-black/70 dark:text-white/70 mb-2 text-center font-extralight">
                Log in to your social world
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <input 
                type="email"
                placeholder="Email"
                className="border border-gray-400 rounded-full p-2 m-2 w-full text-center" />
            </div>

            <div className="flex flex-col justify-center items-center">
              <input 
                type="password"
                placeholder="Password"
                className="border border-gray-400 rounded-full p-2 m-2 w-full text-center" />
            </div>

            <div className="flex flex-col justify-center items-center">
              <button 
                type="submit"
                className="py-2 text-white rounded-full shadow-lg backdrop-blur-xl bg-red-600
                          hover:bg-red-700 hover:scale-101 transition-all duration-300 
                            md:text-xl w-full mt-5">Log In
              </button>
            </div>

            <div>
              <p className="text-center mt-4 text-black/70 dark:text-white/70">
                OR LOG IN WITH
              </p>
            </div>

            <div>
              <div className="flex justify-center space-x-4 mt-4">
                <FcGoogle size={25}/>
                <FaFacebook className="text-blue-600" size={25}/>
                <FaApple className="text-black dark:text-white" size={25} />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-black/70 dark:text-white/70">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>

          </form>
        </div>

      </motion.div>
  );
}
export default LoginPage;