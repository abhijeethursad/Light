'use client'
import React, { useState } from 'react'
import { IoMailOutline, IoLockClosedOutline} from "react-icons/io5";
import { FaEye} from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";


const Form = () => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [showpass, setShowpass] = useState<string>("password")
  

  return (
      <form onSubmit={(e)=>{e.preventDefault()}}>
        
        <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-1">Email</label>
            <div className='flex border-2 border-neutral-400 dark:border-gray-700 items-center gap-2 px-3 rounded-xl focus-within:border-purple-500 bg-neutral-300/40 dark:bg-neutral-800/40'>
                <div className='text-neutral-500'><IoMailOutline /></div>
                <input 
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    className="rounded-xl py-2  focus:outline-none w-full" />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-1">Password</label>
            <div className='flex border-2 border-neutral-400 dark:border-gray-700 items-center gap-2 px-3 rounded-xl focus-within:border-purple-500 bg-neutral-300/40 dark:bg-neutral-800/40'>
                <div className='text-neutral-500'><IoLockClosedOutline /></div>
                <input 
                    type={showpass}
                    placeholder="Enter your password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    className="rounded-xl py-2  focus:outline-none w-full" />

                <div className='text-neutral-500 flex items-center transition-all'>
                    <button 
                        type="button" 
                        onClick={() => setShowpass(showpass === "password" ? "text" : "password")}
                        className="hover:text-neutral-700 transition-colors focus:outline-none">
                        {showpass === "password" ? <FaEye /> : <LuEyeClosed />}
                    </button>
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <button 
            type="submit"
            className="py-2 text-white rounded-xl shadow-lg backdrop-blur-xl bg-red-600 hover:bg-red-700 hover:scale-101 transition-all duration-300 md:text-xl w-full mt-5">
              Log In
          </button>
        </div>
      </form>
  )
}

export default Form