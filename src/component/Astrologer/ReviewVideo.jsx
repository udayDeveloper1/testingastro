import React, { useEffect, useRef, useState, useCallback } from "react";
import "video.js/dist/video-js.css";
import poster1 from "/homepage/video1.webp";

const ReviewVideo = React.memo(() => {
  
  const videos = [
    {
      title: "ChatMyAstrologer - Talk To Astrologer Online",
      src: "https://media.istockphoto.com/id/1158647615/video/close-up-view-of-unrecognisable-female-customer-choosing-a-color-sample-at-a-paint-shop.mp4?s=mp4-640x640-is&k=20&c=OO3UW6frNcHdZvy3unpsfpgh1nzLR6GbrZ7JVw62OqI=",
      poster: poster1,
    },
  ];

  const [playingIndex, setPlayingIndex] = useState(null);
  const videoRefs = useRef([]);

  // Memoized handlePlayPause function to avoid re-creating on each render
  const handlePlayPause = useCallback((index) => {
    if (playingIndex === index) {
      videoRefs.current[index].pause();
      setPlayingIndex(null);
    } else {
      videoRefs.current.forEach((player, i) => i !== index && player?.pause());
      videoRefs.current[index].play();
      setPlayingIndex(index);
    }
  }, [playingIndex]);

  useEffect(() => {
    // Ensure videoRefs is correctly sized and avoid unnecessary updates
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos.length]);

  return (
    <div className="flex flex-wrap justify-center md:justify-between gap-12 md:gap-6">
      {videos.map((video, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center rounded-[10px] bg-white w-full"
        >
          {/* Video Container */}
          <div className="relative w-full h-full rounded-[10px] overflow-hidden">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="video-js vjs-default-skin w-full h-full rounded-[10px] relative"
              controls
              poster={video.poster}
              preload="auto"
            >
              <source src={video.src} type="video/mp4" />
            </video>

            {/* Play/Pause Button */}
            <button
              className="absolute inset-0 flex items-center justify-center"
              onClick={() => handlePlayPause(index)}
            >
              <div className="relative">
                <div className="w-20 relative z-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 shadow-lg cursor-pointer border-gray-300 video-main">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 website_color"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d={
                        playingIndex === index
                          ? "M6 4h4v16H6V4zm8 0h4v16h-4V4z"
                          : "M8 5v14l11-7z"
                      } // Pause/Play icon
                    />
                  </svg>
                </div>
                <div className="z-10">
                  <div className="waves wave-1"></div>
                  <div className="waves wave-2"></div>
                  <div className="waves wave-3"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ReviewVideo;
