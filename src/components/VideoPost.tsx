import React, { useState, useRef, useEffect } from 'react';
import { Cat, MessageCircle, Send, Music, Volume2, VolumeX } from 'lucide-react';

// Custom Cat Paw SVG Component (unchanged)
const CatPaw: React.FC<{ isLiked: boolean; className?: string }> = ({ isLiked, className = "" }) => {
  const padColor = isLiked ? "#E11D48" : "#FCE7F3";
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M26 100V50C26 40 19 36 15 28C11 17 22 7 32 14C37 9 46 8 50 12C54 8 63 9 68 14C78 7 89 17 85 28C81 36 74 40 74 50V100" fill="#F3F4F6" stroke="#111827" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M50 12C54 8 63 9 68 14C78 7 89 17 85 28C81 36 74 40 74 50V100H65V50C65 42 70 38 74 31C77 24 71 15 65 19C61 15 54 15 51 18" fill="#E5E7EB" />
      <path d="M33 52C31 43 41 34 50 34C59 34 69 43 67 52C65 61 57 65 50 65C43 65 35 61 33 52Z" fill={padColor} stroke="#111827" strokeWidth="5" strokeLinejoin="round" />
      <path d="M54 38C58 39 62 44 61 48" stroke={isLiked ? "#FDA4AF" : "#FFFFFF"} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="23" cy="29" rx="5.5" ry="7.5" transform="rotate(-18 23 29)" fill={padColor} stroke="#111827" strokeWidth="5" />
      <ellipse cx="39" cy="18" rx="6" ry="8.5" transform="rotate(-6 39 18)" fill={padColor} stroke="#111827" strokeWidth="5" />
      <ellipse cx="61" cy="18" rx="6" ry="8.5" transform="rotate(6 61 18)" fill={padColor} stroke="#111827" strokeWidth="5" />
      <ellipse cx="77" cy="29" rx="5.5" ry="7.5" transform="rotate(18 77 29)" fill={padColor} stroke="#111827" strokeWidth="5" />
    </svg>
  );
};

// Dedicated Video Component (unchanged from previous fix)
interface ActualVideoPlayerProps {
  src: string;
  isMuted: boolean;
  onMuteFallback: () => void;
}

const ActualVideoPlayer: React.FC<ActualVideoPlayerProps> = ({ src, isMuted, onMuteFallback }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const onMuteFallbackRef = useRef(onMuteFallback);

  useEffect(() => {
    onMuteFallbackRef.current = onMuteFallback;
  }, [onMuteFallback]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let isCancelled = false;
    video.src = src;
    video.load();

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        if (isCancelled) return;
        if (e.name === 'NotAllowedError') {
          console.warn('Playback blocked. Retrying muted.');
          onMuteFallbackRef.current();
          video.muted = true;
          video.play().catch(err => console.error('Muted playback fallback failed:', err));
        }
      });
    }

    return () => {
      isCancelled = true;
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className="w-full h-full object-cover absolute inset-0 z-10"
      loop
      playsInline
      webkit-playsinline="true"
    />
  );
};

interface VideoPostProps {
  post: any;
  isActive: boolean;
  isMuted: boolean;            // Lifted state
  onMuteToggle: () => void;     // Lifted action
  onMuteFallback: () => void;   // Lifted action
}

const VideoPost: React.FC<VideoPostProps> = ({
  post,
  isActive,
  isMuted,
  onMuteToggle,
  onMuteFallback
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFaved, setIsFaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const isTop = post.top !== false;
  const audioText = post.audio || `Original CatGram Audio - @${post.author?.replace('@', '')}`;
  const posterUrl = post.poster || post.thumbnail || post.coverUrl || '';

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
      console.warn('Feedback audio play prevented', e);
    }
  };

  const handleLike = () => {
    playSound();
    setIsLiked(!isLiked);
    setLikeCount((prev: number) => isLiked ? prev - 1 : prev + 1);
  };

  const handleFave = () => {
    playSound();
    setIsFaved(!isFaved);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMuteToggle(); // Trigger parent-level mute state change
  };

  return (
    <div className="w-full h-full bg-zinc-950 flex justify-center items-center p-0 md:p-4">
      <div className="relative w-full h-full md:max-w-[450px] md:max-h-[800px] md:aspect-[9/16] md:rounded-2xl md:shadow-2xl overflow-hidden bg-black flex justify-center items-center">

        {isActive ? (
          <ActualVideoPlayer
            src={post.url}
            isMuted={isMuted}
            onMuteFallback={onMuteFallback}
          />
        ) : (
          <div className="w-full h-full absolute inset-0 bg-zinc-950 z-0">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt=""
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                Loading...
              </div>
            )}
          </div>
        )}

        <div className={`absolute inset-0 pointer-events-none z-10 ${
          isTop
            ? 'bg-gradient-to-b from-black/80 via-black/10 to-transparent'
            : 'bg-gradient-to-t from-black/80 via-black/10 to-transparent'
        }`} />

        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/20 border border-white/10 text-white backdrop-blur-sm transition-opacity hover:bg-black/40 active:scale-95 pointer-events-auto"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-5 z-20 pointer-events-auto">
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-zinc-800 shadow-md transform transition-transform group-hover:scale-110">
              <img
                src={post.authorAvatar}
                alt="Author"
                className="w-full h-full object-cover block"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center border border-white">
              <span className="text-white text-[10px] font-bold leading-none mb-[1px]">+</span>
            </div>
          </div>

          <button onClick={handleLike} className="flex flex-col items-center group transition-transform active:scale-90">
            <div className="p-1 rounded-full bg-black/20 border border-white/10 backdrop-blur-sm shadow-md transition-colors duration-300">
              <div className="w-[34px] h-[34px] p-0.5">
                <CatPaw isLiked={isLiked} className={`transition-all duration-300 ${isLiked ? 'scale-110' : ''}`} />
              </div>
            </div>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">{likeCount}</span>
          </button>

          <button onClick={handleFave} className="flex flex-col items-center group transition-transform active:scale-90">
            <div className={`p-2 rounded-full bg-black/20 border border-white/10 backdrop-blur-sm shadow-md transition-colors duration-300 ${isFaved ? 'text-yellow-400' : 'text-white'}`}>
              <Cat size={22} className={`transition-all duration-300 ${isFaved ? 'fill-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : ''}`} />
            </div>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">Fave</span>
          </button>

          <button className="flex flex-col items-center group cursor-not-allowed opacity-50">
            <div className="p-2 rounded-full bg-black/20 border border-white/10 backdrop-blur-sm shadow-md text-gray-400">
              <MessageCircle size={22} />
            </div>
            <span className="text-gray-400 text-xs font-semibold mt-1 drop-shadow-md">{post.comments}</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('URL copied to clipboard!');
            }}
            className="flex flex-col items-center group transition-transform active:scale-90"
          >
            <div className="p-2 rounded-full bg-black/20 border border-white/10 backdrop-blur-sm shadow-md text-white">
              <Send size={22} />
            </div>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">Share</span>
          </button>
        </div>

        <div className={`absolute left-4 z-20 pointer-events-auto ${
          isTop
            ? 'top-4 right-16'
            : 'bottom-6 right-20'
        }`}>
          {post.title && (
            <h2 className="text-yellow-400 font-extrabold text-base md:text-lg mb-0.5 tracking-wide drop-shadow-md uppercase">
              {post.title}
            </h2>
          )}

          <h3 className="text-white font-bold text-sm mb-1 drop-shadow-lg">{post.author}</h3>
          <p className="text-white text-sm mb-3 drop-shadow-md line-clamp-2">{post.description}</p>

          <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full py-1 px-3 w-max max-w-full">
            <Music size={14} className="text-white animate-spin-slow" />
            <div className="overflow-hidden w-full">
              <p className="text-white text-xs whitespace-nowrap animate-marquee">
                {audioText}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoPost;