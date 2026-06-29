import React, { useState, useEffect, useRef } from 'react';
import VideoPost from './VideoPost';
import { mockVideos } from '../data/mockData';

const ReelsFeed: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Global mute state (defaults to true)
  const containerRef = useRef<HTMLDivElement>(null);

  // Handlers to pass to children
  const handleMuteToggle = () => setIsMuted((prev) => !prev);
  const handleMuteFallback = () => setIsMuted(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = {
      root: container,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) {
            setActiveVideoIndex(index);
          }
        }
      });
    }, options);

    const children = container.querySelectorAll('[data-index]');
    children.forEach((child) => observer.observe(child));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory bg-black hide-scrollbar relative"
      style={{ scrollBehavior: 'smooth' }}
    >
      {mockVideos.map((post, index) => (
        <div
          key={post.id}
          data-index={index}
          className="w-full h-full snap-start shrink-0"
        >
          <VideoPost
            post={post}
            isActive={index === activeVideoIndex}
            isMuted={isMuted}
            onMuteToggle={handleMuteToggle}
            onMuteFallback={handleMuteFallback}
          />
        </div>
      ))}
    </div>
  );
};

export default ReelsFeed;