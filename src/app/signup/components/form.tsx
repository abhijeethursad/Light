'use client'
import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa6";
import { IoMailOutline, IoLockClosedOutline} from "react-icons/io5";
import { FaEye} from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";

const From = () => {
    const [name, setName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [showpass, setShowpass] = useState<string>("password")

  return (
    <form onSubmit={(e)=>{e.preventDefault()}} 
    className='flex flex-col gap-4'>
        <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-1">Full Name</label>
            <div className='flex border-2 border-neutral-400 dark:border-gray-700 items-center gap-2 px-3 rounded-xl focus-within:border-purple-500 bg-neutral-300/40 dark:bg-neutral-800/40'>
                <div className='text-neutral-500'><FaRegUser /></div>
                <input 
                    type="text"
                    placeholder="Your full name"
                    required
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    className="rounded-xl py-2  focus:outline-none w-full" />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-1">UserName</label>
            <div className='flex border-2 border-neutral-400 dark:border-gray-700 items-center gap-2 px-3 rounded-xl focus-within:border-purple-500 bg-neutral-300/40 dark:bg-neutral-800/40'>
                <div className='text-neutral-500'>@</div>
                <input 
                    type="text"
                    placeholder="Choose a username"
                    required
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    className="rounded-xl py-2  focus:outline-none w-full" />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-1">Email</label>
            <div className='flex border-2 border-neutral-400 dark:border-gray-700 items-center gap-2 px-3 rounded-xl focus-within:border-purple-500 bg-neutral-300/40 dark:bg-neutral-800/40'>
                <div className='text-neutral-500'><IoMailOutline /></div>
                <input 
                    type="email"
                    placeholder="your@email.com"
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
                    placeholder="Min 8 characters"
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

            <button 
                type="submit"
                className="py-2 text-white rounded-xl shadow-lg backdrop-blur-xl bg-blue-500 hover:bg-blue-600 hover:scale-101 transition-all duration-300 active:scale-95  md:text-xl w-full">Create Account
            </button>
    </form>

  )
}

export default From