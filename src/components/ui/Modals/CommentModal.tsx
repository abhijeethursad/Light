import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CURRENT_USER = {
  userId: 1,
  username: "abhi_01",
  userProfile: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
};

interface Reply {
  id: string;
  userId: number;
  username: string;
  userProfile: string;
  text: string;
  time: string;
  likesCount: number;
  likedBy: number[];
  isEdited?: boolean;
}

interface Comment {
  id: string;
  userId: number;
  username: string;
  userProfile: string;
  text: string;
  time: string;
  likesCount: number;
  likedBy: number[];
  replies?: Reply[];
  isEdited?: boolean;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  postOwnerUsername: string;
  initialComments: Comment[];
  currentCommentsCount: number;
  onCommentAdded: (newCount: number, newComments: Comment[]) => void;
}

export default function CommentModal({ isOpen, onClose, postId, postOwnerUsername, initialComments, currentCommentsCount, onCommentAdded }: CommentModalProps) {
  const [commentsList, setCommentsList] = useState<Comment[]>(initialComments || []);
  const [newCommentText, setNewCommentText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  
  const [replyingTo, setReplyingTo] = useState<{ commentId: string, username: string } | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  const [activeActionItem, setActiveActionItem] = useState<{ item: Comment | Reply, parentId?: string } | null>(null);
  const [editingItem, setEditingItem] = useState<{ id: string, parentId?: string } | null>(null);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('overflow-hidden', 'touch-none');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('overflow-hidden', 'touch-none');
    }
    return () => { 
      document.body.style.overflow = ''; 
      document.documentElement.style.overflow = '';
      document.body.classList.remove('overflow-hidden', 'touch-none');
    };
  }, [isOpen]);

  // --- 🔥 TIME FORMATTER 🔥 ---
  const formatTimeAgo = (timestamp: string) => {
    // 1. Handle old mock data strings (e.g., "2 hours ago" -> "2h")
    if (timestamp.includes('ago') || timestamp === 'Just now') {
      if (timestamp === 'Just now') return 'Light';
      const match = timestamp.match(/(\d+)\s*(min|hour|day|week)/i);
      if (match) return `${match[1]}${match[2].charAt(0)}`;
      return timestamp;
    }

    // 2. Handle actual ISO timestamps for new comments
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just Now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return `${Math.floor(days / 7)}w`;
  };

  const getExactCommentCount = (commentsArray: Comment[]) => {
    let total = commentsArray.length;
    commentsArray.forEach(comment => {
      if (comment.replies) {
        total += comment.replies.length;
      }
    });
    return total;
  };

  const formatCommentText = (text: string) => {
    if (text.startsWith('@')) {
      const firstSpaceIndex = text.indexOf(' ');
      if (firstSpaceIndex !== -1) {
        const mention = text.substring(0, firstSpaceIndex);
        const restOfText = text.substring(firstSpaceIndex);
        return (
          <><span className="text-blue-500">{mention}</span>{restOfText}</>
        );
      }
    }
    return text;
  };

  const toggleRepliesVisibility = (commentId: string) => {
    setExpandedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) newSet.delete(commentId);
      else newSet.add(commentId);
      return newSet;
    });
  };

  const handleTouchStart = (item: Comment | Reply, parentId?: string) => {
    pressTimer.current = setTimeout(() => {
      setActiveActionItem({ item, parentId });
    }, 500); 
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  const handleContextMenu = (e: React.MouseEvent, item: Comment | Reply, parentId?: string) => {
    e.preventDefault(); 
    setActiveActionItem({ item, parentId });
  };

  const syncWithDb = async (updatedComments: Comment[], newCount?: number) => {
    setCommentsList(updatedComments);
    onCommentAdded(newCount !== undefined ? newCount : currentCommentsCount, updatedComments);
    try {
      const payload: any = { comments: updatedComments };
      if (newCount !== undefined) payload.CommentsCount = newCount;
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, payload);
    } catch (error) {
      console.error("Database sync failed:", error);
    }
  };

  const handleDelete = () => {
    if (!activeActionItem) return;
    const { item, parentId } = activeActionItem;
    
    let updatedComments;

    if (parentId) {
      updatedComments = commentsList.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: c.replies?.filter(r => r.id !== item.id) };
        }
        return c;
      });
    } else {
      updatedComments = commentsList.filter(c => c.id !== item.id);
    }

    const exactCount = getExactCommentCount(updatedComments);
    syncWithDb(updatedComments, exactCount);
    setActiveActionItem(null);
  };

  const initiateEdit = () => {
    if (!activeActionItem) return;
    setEditingItem({ id: activeActionItem.item.id, parentId: activeActionItem.parentId });
    setNewCommentText(activeActionItem.item.text);
    setReplyingTo(null);
    setActiveActionItem(null);
  };

  const handleReport = () => {
    alert("Comment reported. Our team will review this shortly.");
    setActiveActionItem(null);
  };

  const handlePostOrEdit = async () => {
    if (!newCommentText.trim()) return;
    setIsPosting(true);

    let updatedComments = [...commentsList];

    if (editingItem) {
      if (editingItem.parentId) {
        updatedComments = updatedComments.map(c => {
          if (c.id === editingItem.parentId) {
            return {
              ...c,
              replies: c.replies?.map(r => r.id === editingItem.id ? { ...r, text: newCommentText.trim(), isEdited: true } : r)
            };
          }
          return c;
        });
      } else {
        updatedComments = updatedComments.map(c => c.id === editingItem.id ? { ...c, text: newCommentText.trim(), isEdited: true } : c);
      }
      setEditingItem(null);
      await syncWithDb(updatedComments);
    } else {
      const newEntry = {
        id: Date.now().toString(),
        userId: CURRENT_USER.userId,
        username: CURRENT_USER.username,
        userProfile: CURRENT_USER.userProfile,
        text: newCommentText.trim(),
        time: new Date().toISOString(), // 🔥Saves exact computer timestamp
        likesCount: 0,
        likedBy: [],
        isEdited: false
      };

      if (replyingTo) {
        updatedComments = updatedComments.map(c => {
          if (c.id === replyingTo.commentId) {
            return { ...c, replies: [...(c.replies || []), newEntry] };
          }
          return c;
        });
        setExpandedReplies(prev => new Set(prev).add(replyingTo.commentId));
      } else {
        updatedComments.unshift({ ...newEntry, replies: [] });
      }
      
      setReplyingTo(null);
      
      const exactCount = getExactCommentCount(updatedComments);
      await syncWithDb(updatedComments, exactCount);
    }

    setNewCommentText("");
    setIsPosting(false);
  };

  const handleToggleLike = async (commentId: string, replyId?: string) => {
    const updatedComments = commentsList.map(comment => {
      if (replyId && comment.id === commentId) {
        const updatedReplies = comment.replies?.map(reply => {
          if (reply.id === replyId) {
            const hasLiked = reply.likedBy?.includes(CURRENT_USER.userId);
            return {
              ...reply,
              likesCount: hasLiked ? (reply.likesCount || 1) - 1 : (reply.likesCount || 0) + 1,
              likedBy: hasLiked ? reply.likedBy.filter(id => id !== CURRENT_USER.userId) : [...(reply.likedBy || []), CURRENT_USER.userId]
            };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      if (!replyId && comment.id === commentId) {
        const hasLiked = comment.likedBy?.includes(CURRENT_USER.userId);
        return {
          ...comment,
          likesCount: hasLiked ? (comment.likesCount || 1) - 1 : (comment.likesCount || 0) + 1,
          likedBy: hasLiked ? comment.likedBy.filter(id => id !== CURRENT_USER.userId) : [...(comment.likedBy || []), CURRENT_USER.userId]
        };
      }
      return comment;
    });
    syncWithDb(updatedComments);
  };

  // 1. Separate your comments from everyone else's
  const myComments = commentsList.filter(
    (c) => String(c.userId) === String(CURRENT_USER.userId) || c.username === CURRENT_USER.username
  );
  
  const otherComments = commentsList.filter(
    (c) => !(String(c.userId) === String(CURRENT_USER.userId) || c.username === CURRENT_USER.username)
  );

  // 2. Create a reusable sorter (Most Likes -> Newest)
  const sortByLikesAndDate = (a: Comment, b: Comment) => {
    const likesA = a.likesCount || 0;
    const likesB = b.likesCount || 0;
    
    if (likesB !== likesA) {
      return likesB - likesA; 
    }
    return String(b.id).localeCompare(String(a.id));
  };

  // 3. Sort both groups internally
  myComments.sort(sortByLikesAndDate);
  otherComments.sort(sortByLikesAndDate);

  // 4. Merge them together (Yours are ALWAYS locked to the top)
  const sortedComments = [...myComments, ...otherComments];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
          />

          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) onClose(); 
            }}
            className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto h-[75vh] bg-white dark:bg-[#121212] rounded-t-3xl z-[101] flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="w-full pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>

            <div className="flex justify-center items-center pb-3 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-bold text-lg text-black dark:text-white">Comments</h2>
            </div>

            <div 
              className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-6 custom-scrollbar select-none"
              onPointerDownCapture={(e) => e.stopPropagation()} 
            >
              {sortedComments.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <p className="text-lg font-semibold">No comments yet.</p>
                  <p className="text-sm">Start the conversation.</p>
                </div>
              ) : (
                sortedComments.map((comment) => (
                  <div key={comment.id} className="flex flex-col gap-3">
                    <div 
                      className="flex gap-3 items-start justify-between w-full"
                      onTouchStart={() => handleTouchStart(comment)}
                      onTouchEnd={handleTouchEnd}
                      onContextMenu={(e) => handleContextMenu(e, comment)}
                    >
                      <div className="flex gap-3 items-start flex-1">
                        <Image src={comment.userProfile} alt={comment.username} width={36} height={36} className="rounded-full object-cover aspect-square flex-shrink-0 border border-gray-200 dark:border-gray-800 pointer-events-none" />
                        <div>
                          <p className="text-sm text-black dark:text-gray-200 break-words">
                            <span className="font-bold mr-2 text-black dark:text-white">{comment.username}</span>
                            {formatCommentText(comment.text)}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            {/* 🔥 Renders times */}
                            <p className="text-xs text-gray-500">{formatTimeAgo(comment.time)}</p>
                            
                            {comment.isEdited && <p className="text-[10px] text-gray-400 font-medium">Edited</p>}
                            {comment.likesCount > 0 && <p className="text-xs font-semibold text-gray-500">{comment.likesCount} likes</p>}
                            <button onClick={() => { setReplyingTo({ commentId: comment.id, username: comment.username }); setNewCommentText(`@${comment.username} `); }} className="text-xs text-gray-500 font-semibold hover:text-gray-800 dark:hover:text-gray-300">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleToggleLike(comment.id)} className="pt-2 pl-2">
                        {comment.likedBy?.includes(CURRENT_USER.userId) ? <FaHeart size={14} className="text-red-500" /> : <FaRegHeart size={14} className="text-gray-400" />}
                      </button>
                    </div>

                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-[48px] flex flex-col gap-3">
                        {!expandedReplies.has(comment.id) ? (
                           <button onClick={() => toggleRepliesVisibility(comment.id)} className="text-xs font-bold text-gray-500 flex items-center gap-3 w-fit">
                              <div className="w-6 h-[1px] bg-gray-500" /> View replies ({comment.replies.length})
                           </button>
                        ) : (
                           <>
                             {comment.replies.map((reply) => (
                               <div 
                                 key={reply.id} 
                                 className="flex gap-3 items-start justify-between w-full mt-2"
                                 onTouchStart={() => handleTouchStart(reply, comment.id)}
                                 onTouchEnd={handleTouchEnd}
                                 onContextMenu={(e) => handleContextMenu(e, reply, comment.id)}
                               >
                                 <div className="flex gap-3 items-start flex-1">
                                    <Image src={reply.userProfile} alt={reply.username} width={28} height={28} className="rounded-full object-cover aspect-square flex-shrink-0 border border-gray-200 dark:border-gray-800 pointer-events-none" />
                                    <div>
                                      <p className="text-sm text-black dark:text-gray-200 break-words">
                                        <span className="font-bold mr-2 text-black dark:text-white">{reply.username}</span>
                                        {formatCommentText(reply.text)}
                                      </p>
                                      <div className="flex items-center gap-4 mt-1">
                                        {/* 🔥 Renders times */}
                                        <p className="text-xs text-gray-500">{formatTimeAgo(reply.time)}</p>
                                        
                                        {reply.isEdited && <p className="text-[10px] text-gray-400 font-medium">Edited</p>}
                                        {reply.likesCount > 0 && <p className="text-xs font-semibold text-gray-500">{reply.likesCount} likes</p>}
                                        <button onClick={() => { setReplyingTo({ commentId: comment.id, username: reply.username }); setNewCommentText(`@${reply.username} `); }} className="text-xs text-gray-500 font-semibold">
                                          Reply
                                        </button>
                                      </div>
                                    </div>
                                 </div>
                                 <button onClick={() => handleToggleLike(comment.id, reply.id)} className="pt-2 pl-2">
                                    {reply.likedBy?.includes(CURRENT_USER.userId) ? <FaHeart size={14} className="text-red-500" /> : <FaRegHeart size={14} className="text-gray-400" />}
                                  </button>
                               </div>
                             ))}
                             <button onClick={() => toggleRepliesVisibility(comment.id)} className="text-xs font-bold text-gray-500 flex items-center gap-3 w-fit mt-1">
                                <div className="w-6 h-[1px] bg-gray-500" /> Hide replies
                             </button>
                           </>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212]">
              {(replyingTo || editingItem) && (
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {editingItem ? "Editing comment" : <>Replying to <span className="font-semibold text-gray-700 dark:text-gray-200">{replyingTo?.username}</span></>}
                  </p>
                  <button onClick={() => { setReplyingTo(null); setEditingItem(null); setNewCommentText(""); }}>
                    <IoClose size={16} className="text-gray-500" />
                  </button>
                </div>
              )}

              <div className="p-4 flex gap-3 items-center">
                <Image src={CURRENT_USER.userProfile} alt="You" width={40} height={40} className="rounded-full object-cover aspect-square" />
                <input 
                  type="text"
                  placeholder={editingItem ? "Edit comment..." : replyingTo ? "Add a reply..." : "Add a comment..."}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePostOrEdit()}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-black dark:text-white placeholder-gray-500"
                />
                <button 
                  onClick={handlePostOrEdit}
                  disabled={!newCommentText.trim() || isPosting}
                  className="text-blue-500 font-semibold text-sm disabled:opacity-50"
                >
                  {editingItem ? "Update" : "Post"}
                </button>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {activeActionItem && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[102] flex items-center justify-center px-4"
              >
                <div className="absolute inset-0 bg-black/40" onClick={() => setActiveActionItem(null)} />
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white dark:bg-gray-900 w-full max-w-xs rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col"
                >
                  {(CURRENT_USER.username === activeActionItem.item.username) && (
                    <button onClick={initiateEdit} className="p-4 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800">
                      Edit
                    </button>
                  )}
                  
                  {(CURRENT_USER.username === activeActionItem.item.username || CURRENT_USER.username === postOwnerUsername) && (
                    <button onClick={handleDelete} className="p-4 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800">
                      Delete
                    </button>
                  )}

                  <button onClick={handleReport} className="p-4 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800">
                    Report
                  </button>
                  
                  <button onClick={() => setActiveActionItem(null)} className="p-4 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                    Cancel
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}