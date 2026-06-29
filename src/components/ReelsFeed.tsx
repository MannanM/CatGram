import React, { useState, useEffect, useRef } from 'react';
import VideoPost from './VideoPost';
import { mockVideos } from '../data/mockData';

const ReelsFeed: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = container.clientHeight;
      // Calculate which video is most visible
      const index = Math.round(scrollPosition / windowHeight);
      
      if (index !== activeVideoIndex && index >= 0 && index < mockVideos.length) {
        setActiveVideoIndex(index);
      }
    };

    container.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeVideoIndex]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory bg-black hide-scrollbar relative"
      style={{ scrollBehavior: 'smooth' }}
    >
      {mockVideos.map((post, index) => (
        <VideoPost 
          key={post.id} 
          post={post} 
          isActive={index === activeVideoIndex} 
        />
      ))}
    </div>
  );
};

export default ReelsFeed;
