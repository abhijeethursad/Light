import React, { useState } from 'react';
import Image from "next/image";
import { RiMusic2Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaRegCommentDots, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

interface PostProps {
  username: string;
  ProfileImg: string;
  Audioname:string;
  Artist:string;
  Audio:string;
  Postimg:string;
  LikesCount:number;
  CommentsCount:number;
  ShareCount:number;
  likedBy: { username: string }[];
  time:string;
  description:string;
}

function Post({ username, ProfileImg, Audioname, Artist, Audio, Postimg, LikesCount, CommentsCount, ShareCount, likedBy, time, description }: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const MAX_LENGTH = 100;
  const isLongText = description.length > MAX_LENGTH;
  const firstLiker = likedBy && likedBy.length > 0 ? likedBy[0].username : null;

  return (
    <>
      <div className="p-3 flex">
        <div className='flex gap-2 w-full'>
          <div>
            <Image
              src={ProfileImg}
              alt=""
              width={40}
              height={40}
              className="rounded-full object-cover aspect-square"
              placeholder="blur" 
              blurDataURL="..."
            />
          </div>

          <div>
              <p>{username}</p>
              <p className='text-xs text-black/60 dark:text-white/60 flex gap-[3px]'><RiMusic2Fill className='mt-[2px] text-black dark:text-white animate-pulse'/>{Audioname} By {Artist}</p>
          </div>

        </div>
        <div className='place-content-center'>
          <BsThreeDotsVertical size={20}/>
        </div>
      </div>

      <div className='relative w-full aspect-4/5 bg-gray-100'>
        <Image
        src={Postimg}
        alt=""
        fill
        className='object-cover'
        placeholder="blur" 
        blurDataURL="..."
        />
      </div>

      <div className='flex p-3'>
        <div className='flex gap-4 w-full'>
          <div className='flex gap-1'>
            <FaRegHeart size={25}/>
            <p className='place-content-center'>{LikesCount}</p>
          </div>
          <div className='flex gap-1 '>
            <FaRegComment size={25} className='transform -scale-x-100'/>
            <p className='place-content-center'>{CommentsCount}</p>
          </div>
          <div className='flex gap-1'>
            <PiPaperPlaneTiltBold className='origin-center rotate-10' size={25}/>
            <p className='place-content-center'>{ShareCount}</p>
          </div>
        </div>
        <div className='place-content-center'>
          <FaRegBookmark size={25}/>
        </div>
      </div>

      <div className='px-3 pb-2'>
        {firstLiker && (
             <p>Liked by {firstLiker} and others</p>
        )}
       
        {/* FIXED: The button is now INSIDE the <p> tag */}
        <p className={`text-sm text-gray-800 dark:text-gray-200 opacity-90 transition-all duration-200 break-words`}>
            {/* Username bold */}
            <span className="font-semibold mr-2 text-black dark:text-white">{username}</span>
            
            {/* Description Text */}
            {isExpanded || !isLongText ? description : description.slice(0, MAX_LENGTH) + "..."}

            {/* Button Inline */}
            {isLongText && (
                <button 
                  className="text-gray-600 dark:text-gray-400 font-bold hover:text-white dark:hover:text-white" 
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                {isExpanded ? "less" : "more"}
                </button>
            )}
        </p>

        <p className='text-white/50 mt-1 text-sm'>{time}</p>
      </div>
    </>
  );
}

export default Post;