import React, { useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CURRENT_USER = {
  userId: 1, 
  username: "abhi_01",
  userProfile: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
};

interface LikedByUser {
  userId: number;
  username: string;
  userProfile?: string;
}

interface LikeButtonProps {
  postId: number;
  initialLikesCount: number;
  initialLikedBy: LikedByUser[]; 
}

export default function LikeButton({ postId, initialLikesCount, initialLikedBy }: LikeButtonProps) {
  const hasUserAlreadyLiked = initialLikedBy.some((user) => user.userId === CURRENT_USER.userId);

  const [liked, setLiked] = useState(hasUserAlreadyLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [likedByList, setLikedByList] = useState<LikedByUser[]>(initialLikedBy);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLike = async () => {
    const newLikedStatus = !liked;
    const newLikesCount = newLikedStatus ? likesCount + 1 : likesCount - 1;
    
    let newLikedByList;
    if (newLikedStatus) {
      newLikedByList = [...likedByList, CURRENT_USER];
    } else {
      newLikedByList = likedByList.filter(user => user.userId !== CURRENT_USER.userId);
    }

    setLiked(newLikedStatus);
    setLikesCount(newLikesCount);
    setLikedByList(newLikedByList);
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        LikesCount: newLikesCount,
        likedBy: newLikedByList 
      });
    } catch (error) {
      console.error('Error updating like count:', error);
      setLiked(!newLikedStatus);
      setLikesCount(liked ? newLikesCount + 1 : newLikesCount - 1);
      setLikedByList(likedByList); 
    }
  };

  return (
    <div className="flex gap-1 items-center">
      <button
        onClick={toggleLike}
        className={`transition-transform duration-200 ease-in-out cursor-pointer ${
          isAnimating ? 'scale-125' : 'scale-100'
        }`}
      >
        {liked ? (
          <FaHeart size={24} className="text-red-500" />
        ) : (
          <FaRegHeart size={24} className="text-black dark:text-white hover:text-gray-500" />
        )}
      </button>
      <p className="place-content-center text-sm font-semibold">{likesCount}</p>
    </div>
  );
}