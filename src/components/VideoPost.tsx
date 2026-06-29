import React, { useState, useRef, useEffect } from 'react';
import { Cat, PawPrint, MessageCircle, Send, Music } from 'lucide-react';
import type { VideoPostData } from '../data/mockData';

interface VideoPostProps {
  post: VideoPostData;
  isActive: boolean;
}

const VideoPost: React.FC<VideoPostProps> = ({ post, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isFaved, setIsFaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(e => console.error('Auto-play prevented', e));
    } else {
      videoRef.current?.pause();
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const playSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.error('Audio play prevented', e);
    }
  };

  const handleLike = () => {
    playSound();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleFave = () => {
    playSound();
    setIsFaved(!isFaved);
  };

  return (
    <div className="relative w-full h-full snap-start bg-black overflow-hidden flex justify-center items-center">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={post.url}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted // Muted to allow autoplay without interaction initially, but user can unmute in a real app
        onClick={() => {
          if (videoRef.current?.paused) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        }}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 z-10 pointer-events-auto">
        
        {/* Author Avatar */}
        <div className="relative group cursor-pointer">
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg transform transition-transform group-hover:scale-110">
            <img src={post.authorAvatar} alt="Author" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center border border-white">
            <span className="text-white text-xs font-bold leading-none mb-[1px]">+</span>
          </div>
        </div>

        {/* Like Button (PawPrint) */}
        <button onClick={handleLike} className="flex flex-col items-center group transition-transform active:scale-90">
          <div className={`p-3 rounded-full bg-black/40 backdrop-blur-md shadow-lg transition-colors duration-300 ${isLiked ? 'text-pink-500' : 'text-white'}`}>
            <PawPrint size={28} className={`transition-all duration-300 ${isLiked ? 'fill-pink-500 scale-110 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' : ''}`} />
          </div>
          <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">{likeCount}</span>
        </button>

        {/* Favorite Button (Cat Face) */}
        <button onClick={handleFave} className="flex flex-col items-center group transition-transform active:scale-90">
          <div className={`p-3 rounded-full bg-black/40 backdrop-blur-md shadow-lg transition-colors duration-300 ${isFaved ? 'text-yellow-400' : 'text-white'}`}>
            <Cat size={28} className={`transition-all duration-300 ${isFaved ? 'fill-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : ''}`} />
          </div>
          <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">Fave</span>
        </button>

        {/* Comment Button (Disabled) */}
        <button className="flex flex-col items-center group cursor-not-allowed opacity-50">
          <div className="p-3 rounded-full bg-black/40 backdrop-blur-md shadow-lg text-gray-400">
            <MessageCircle size={28} />
          </div>
          <span className="text-gray-400 text-xs font-semibold mt-1 drop-shadow-md">{post.comments}</span>
        </button>

        {/* Share Button */}
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('URL copied to clipboard!');
          }}
          className="flex flex-col items-center group transition-transform active:scale-90"
        >
          <div className="p-3 rounded-full bg-black/40 backdrop-blur-md shadow-lg text-white">
            <Send size={28} />
          </div>
          <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">Share</span>
        </button>

      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-20 z-10 pointer-events-auto">
        <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">{post.author}</h3>
        <p className="text-white text-sm mb-3 drop-shadow-md line-clamp-2">{post.description}</p>
        
        {/* Audio Track Info */}
        <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full py-1 px-3 w-max max-w-full">
          <Music size={14} className="text-white animate-spin-slow" />
          <div className="overflow-hidden w-full">
            <p className="text-white text-xs whitespace-nowrap animate-marquee">
              Original CatGram Audio - @{post.author.replace('@', '')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPost;
