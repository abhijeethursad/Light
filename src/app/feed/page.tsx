"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Story from '@/components/modules/feed/Story';
import Post from '@/components/modules/feed/Post';
import { FeedSkeleton } from '@/components/ui/Skeletons/feed';

export interface StoryType {
  id: number;
  username: string;
  img: string;
}

export interface LikedUser {
  userId: number;
  username: string;
  userProfile: string;
}

export interface PostType {
  id: number;
  username: string;
  ProfileImg: string;
  Audioname: string;
  Artist: string;
  Audio: string;
  Postimg: string;
  LikesCount: number;
  CommentsCount: number;
  ShareCount: number;
  description: string;
  time: string;
  likedBy: LikedUser[];
  comments?: any[]; 
}

function Feed() {
  const [stories, setStories] = useState<StoryType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const [storiesRes, postsRes] = await Promise.all([
          axios.get(`${API_URL}/stories`),
          axios.get(`${API_URL}/posts`)
        ]);
        
        setStories(storiesRes.data);
        setPosts(postsRes.data);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedData();
  }, [API_URL]);

  if (isLoading) return <FeedSkeleton />;

  return (
    <div className="md:hidden w-full min-h-screen bg-white dark:bg-black pb-15 overflow-y-scroll no-scrollbar">
      {/* Dynamic Stories Section */}
      <div>
        <div className="flex space-x-4 overflow-x-auto p-2 no-scrollbar snap-x touch-pan-x">
          {stories.map((story) => (
            <div key={story.id} className="snap-center shrink-0 font-medium">
               <Story img={story.img} username={story.username} />
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Posts Section */}
      {posts.map((post) => (
        <div key={post.id}>
          <Post
            id={post.id}
            ProfileImg={post.ProfileImg} 
            username={post.username} 
            Audioname={post.Audioname} 
            Artist={post.Artist} 
            Audio={post.Audio} 
            Postimg={post.Postimg} 
            LikesCount={post.LikesCount} 
            CommentsCount={post.CommentsCount} 
            comments={post.comments || []} 
            ShareCount={post.ShareCount} 
            likedBy={post.likedBy}
            time={post.time} 
            description={post.description}
          />
        </div>
      ))}
    </div>
  );
}

export default Feed;