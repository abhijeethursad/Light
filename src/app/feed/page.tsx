"use client";

import React, { useEffect } from 'react';
import Story from '@/components/Story';
import Post from '@/components/Post';
import { motion } from 'framer-motion'
import {UserStories} from '@/app/constants/storydata';
import { UserPost } from '../constants/postdara';



function Feed() {
  
  return (
    <motion.div className="w-full min-h-screen bg-white dark:bg-black pb-15 overflow-y-scroll no-scrollbar"
    initial={{ opacity:0 }}
    animate={{ opacity:1, }}
    transition={{ duration:0.5, ease:"easeOut" }}>

      {/* Stories Section */}
      <div>
        <div className="flex space-x-4 overflow-x-auto p-2 no-scrollbar snap-x touch-pan-x">
          
          {UserStories.map((user) => (
            <div key={user.id} className="snap-center shrink-0 font-medium">
               <Story img={user.img} username={user.username} />
            </div>
          ))}

        </div>
      </div>

      {/* Posts Section*/}
      {UserPost.map((post) =>(
        <div key={post.id}>
          <Post ProfileImg={post.ProfileImg} username={post.username} Audioname={post.Audioname} 
                Artist={post.Artist} Audio={post.Audio} Postimg={post.Postimg} LikesCount={post.LikesCount} 
                CommentsCount={post.CommentsCount} ShareCount={post.ShareCount} likedBy={post.likedBy}
                time={post.time} description={post.description}
                />
        </div>
      ))}

    </motion.div>
  );
}

export default Feed;