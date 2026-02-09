"use client";

import React, { useRef, useState, useEffect } from "react";
import { videos } from '@/app/constants/videodata';
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { GoMute } from "react-icons/go"; 
import { FaHeart, FaRegHeart, FaRegCommentDots, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { motion } from 'framer-motion'
import { FaRegComment } from "react-icons/fa6";

function VideosPage() {
  // 1. STATE: Start with empty array to force loading screen (Fixes Mobile Shuffle Bug)
  const [shuffledVideos, setShuffledVideos] = useState([]); 
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);

  // 2. SHUFFLE LOGIC
  useEffect(() => {
    let array = [...videos];
    
    // Fisher-Yates Shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    setShuffledVideos(array);

    // Set first video active immediately
    if (array.length > 0) {
      setActiveVideoId(array[0].id);
    }
  }, []);

  // 3. OBSERVER LOGIC
  useEffect(() => {
    if (shuffledVideos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveVideoId(Number(entry.target.getAttribute("data-id")));
          }
        });
      },
      { threshold: 0.6 }
    );
    
    // Tiny delay to ensure DOM is ready
    setTimeout(() => {
        const cards = document.querySelectorAll(".video-card");
        cards.forEach((card) => observer.observe(card));
    }, 100);

    return () => observer.disconnect();
  }, [shuffledVideos]); 

  // 4. LOADING SCREEN (Prevents "Video ID 1" flash on mobile)
  if (shuffledVideos.length === 0) {
    return (
      <div className="h-[100dvh] w-full bg-black flex items-center justify-center">
         <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    // Height Calculation: 100dvh - 60px (Navbar)
    <motion.div className="relative h-[calc(100dvh-60px)] w-full bg-black"
        initial={{ opacity:0 }}
        animate={{ opacity:1, }}
        transition={{ duration:0.5, ease:"easeOut"}} >
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 pt-6 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="flex items-center justify-between text-white pointer-events-auto">
          <Link href="/feed">
            <IoIosArrowBack size={28} className="drop-shadow-md"/>
          </Link>
          <h1 className="text-xl font-bold drop-shadow-md">Flicks</h1>
          <Link href={"/upload"}>
            <FaPlus size={26}/>
          </Link>
        </div>
      </div>

      {/* Feed Container */}
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {shuffledVideos.map((video) => (
          <VideoCard 
            key={video.id} 
            video={video} 
            isActive={activeVideoId === video.id}
            isGlobalMuted={isGlobalMuted}
            setIsGlobalMuted={setIsGlobalMuted}
          />
        ))}
      </div>
    </motion.div>
  );
}

function VideoCard({ video, isActive, isGlobalMuted, setIsGlobalMuted }) {
  const videoRef = useRef(null);
  const [isPausedByHold, setIsPausedByHold] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(1240);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const lastTapRef = useRef(0); 

  // Video Play/Pause Logic
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isGlobalMuted;
      if (isActive && !isPausedByHold) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {});
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPausedByHold, isGlobalMuted]);

  // Interaction Handlers
  const handleInteraction = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; 
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      triggerLike();
    } else {
      setIsGlobalMuted(!isGlobalMuted);
    }
    lastTapRef.current = now;
  };

  const triggerLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 1000); 
  };

  const toggleLikeButton = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleHoldStart = () => setIsPausedByHold(true);
  const handleHoldEnd = () => setIsPausedByHold(false);

  return (
    <motion.div
    initial={{ opacity:0 }}
    animate={{ opacity:1, }}
    transition={{ duration:0.5, ease:"easeOut"}}>
    <div 
      className="video-card h-[calc(100dvh-60px)] w-full snap-start relative flex items-center justify-center bg-black select-none"
      data-id={video.id}
      onClick={handleInteraction}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onContextMenu={(e) => e.preventDefault()} 
    >
      
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-transform duration-200 ${isExpanded ? "scale-100 opacity-100" : "scale-100"}`}
        src={video.url}
        loop
        muted={isGlobalMuted} 
        playsInline
      />

      {/* Heart Pop Animation */}
      {showHeartOverlay && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
            <FaHeart className="text-white/90 drop-shadow-2xl animate-heart-pop text-9xl" />
        </div>
      )}

      {/* Mute Icon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
         {isGlobalMuted && !showHeartOverlay && (
            <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm animate-pulse">
                <GoMute className="text-white text-4xl" />
            </div>
         )}
      </div>

      {/* Right Sidebar */}
      <div className="absolute bottom-4 right-2 z-30 flex flex-col items-center gap-6 pointer-events-auto">
          <div className="flex flex-col items-center gap-1">
            <button onClick={toggleLikeButton} className="active:scale-75 transition-transform duration-150">
                {isLiked ? <FaHeart size={35} className="text-red-500 drop-shadow-md" /> : <FaRegHeart size={35} className="text-white drop-shadow-md" />}
            </button>
            <span className="text-white text-xs font-semibold drop-shadow-md">{(likeCount / 1000).toFixed(1)}k</span>
          </div>

          <div className="flex flex-col items-center gap-1">
             <button className="active:scale-90 transition-transform">
                <FaRegComment size={32} className="text-white drop-shadow-md transform -scale-x-100" />
             </button>
             <span className="text-white text-xs font-semibold drop-shadow-md">342</span>
          </div>

          <div className="flex flex-col items-center gap-1">
             <button className="active:scale-90 transition-transform">
                <PiPaperPlaneTiltBold size={32} className="text-white drop-shadow-md origin-center rotate-10" />
             </button>
             <span className="text-white text-xs font-semibold drop-shadow-md">Share</span>
          </div>

          <div className="flex flex-col items-center gap-1">
             <button onClick={toggleSave} className="active:scale-90 transition-transform">
                {isSaved ? <FaBookmark size={30} className="text-yellow-400 drop-shadow-md" /> : <FaRegBookmark size={30} className="text-white drop-shadow-md" />}
             </button>
          </div>

          <div className="mt-2 border-2 border-gray-800 rounded-full p-[2px]">
             <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden animate-[spin_5s_linear_infinite]">
                 <img src="https://ui-avatars.com/api/?name=Music" alt="music" className="w-full h-full object-cover" />
             </div>
          </div>
      </div>

      {/* Bottom Description */}
      <div className={`absolute bottom-0 left-0 w-full px-4 pt-20 transition-all duration-300 ease-in-out bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none scroll-smooth ${isExpanded ? "pb-8" : "pb-4"}`}>
        <div className="flex flex-col gap-2 max-w-[80%] pointer-events-auto">
            <h3 className="font-bold text-lg text-white drop-shadow-md cursor-pointer hover:underline">
                @{video.username || "user_name"}
            </h3>
            
            <div 
              onClick={(e) => {
                e.stopPropagation(); // Prevents mute toggle when clicking text
                setIsExpanded(!isExpanded);
              }} 
              className="cursor-pointer"
            >
                <p className={`text-sm text-gray-200 opacity-90 transition-all duration-200 ${isExpanded ? "line-clamp-none overflow-y-auto max-h-45" : "line-clamp-2"}`}>
                    {video.description || "Video description..."}
                </p>
                <button className="text-xs font-bold text-gray-400 mt-1">
                    {isExpanded ? "less" : "more"}
                </button>
            </div>
            
            <div className={`flex items-center gap-2 mt-1 transition-opacity duration-200 ${isExpanded ? "opacity-50" : "opacity-100"}`}>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <div className="text-xs text-white overflow-hidden w-40 relative">
                   <div className="animate-marquee whitespace-nowrap">
                      Original Audio - @{video.username || "user"} • Original Audio
                   </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  </motion.div>
  );
}

export default VideosPage;