import React, { useState } from 'react';
import Image from "next/image";
import { RiMusic2Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment, FaRegBookmark } from "react-icons/fa6";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import LikeButton from "@/components/ui/Buttons/LikeButton";
import CommentModal from "@/components/ui/Modals/CommentModal";

interface PostProps {
  id: number;
  username: string;
  ProfileImg: string;
  Audioname: string;
  Artist: string;
  Audio: string;
  Postimg: string;
  LikesCount: number;
  CommentsCount: number;
  comments?: any[];
  ShareCount: number;
  likedBy: { userId: number; username: string; userProfile?: string }[];
  time: string;
  description: string;
}

function Post({ id, username, ProfileImg, Audioname, Artist, Audio, Postimg, LikesCount, CommentsCount, comments, ShareCount, likedBy, time, description }: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const MAX_LENGTH = 100;
  const isLongText = description.length > MAX_LENGTH;
  const firstLiker = likedBy && likedBy.length > 0 ? likedBy[0].username : null;

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [localCommentsCount, setLocalCommentsCount] = useState(CommentsCount);
  const [localCommentsArray, setLocalCommentsArray] = useState(comments || []);

  const handleCommentAdded = (newCount: number, newCommentsArray: any[]) => {
    setLocalCommentsCount(newCount);
    setLocalCommentsArray(newCommentsArray);
  };

  return (
    <>
      <div className="p-3 flex">
        <div className='flex gap-2 w-full'>
          <div>
            <Image src={ProfileImg} alt="" width={40} height={40} className="rounded-full object-cover aspect-square" placeholder="blur" blurDataURL="..." />
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
        <Image src={Postimg} alt="" fill className='object-cover' placeholder="blur" blurDataURL="..." />
      </div>

      <div className='flex p-3'>
        <div className='flex gap-4 w-full'>
            <LikeButton postId={id} initialLikesCount={LikesCount} initialLikedBy={likedBy}/>
            
          <button onClick={() => setIsCommentModalOpen(true)} className='flex gap-1 items-center hover:opacity-70 transition-opacity'>
            <FaRegComment size={25} className='transform -scale-x-100'/>
            <p className='place-content-center'>{localCommentsCount}</p>
          </button>

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
        {firstLiker && <p>Liked by {firstLiker} and others</p>}
       
        <p className={`text-sm text-gray-800 dark:text-gray-200 opacity-90 transition-all duration-200 break-words`}>
            <span className="font-semibold mr-2 text-black dark:text-white">{username}</span>
            {isExpanded || !isLongText ? description : description.slice(0, MAX_LENGTH) + "...\u00A0"}
            {isLongText && (
                <button className="text-gray-600 dark:text-gray-400 font-bold hover:text-white dark:hover:text-white" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "\u00A0less" : "more"}
                </button>
            )}
        </p>

        {localCommentsCount > 0 && (
          <button onClick={() => setIsCommentModalOpen(true)} className="text-gray-500 text-sm mt-1 cursor-pointer hover:underline block text-left">
            View all {localCommentsCount} comments
          </button>
        )}

        <p className='text-white/50 mt-1 text-sm'>{time}</p>
      </div>

      <CommentModal 
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postId={id}
        postOwnerUsername={username} // <--- ADD THIS LINE
        initialComments={localCommentsArray}
        currentCommentsCount={localCommentsCount}
        onCommentAdded={handleCommentAdded}
      />
    </>
  );
}

export default Post;