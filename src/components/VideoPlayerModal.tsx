import React, { useState, useEffect, useRef, useCallback } from 'react';
import './VideoPlayerModal.css';

interface Project {
  id: number;
  title: string;
  category: string;
  videoUrl?: string;
  posterUrl?: string;
}

interface VideoPlayerModalProps {
  project: Project | null;
  onClose: () => void;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [buffered, setBuffered] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [centerAction, setCenterAction] = useState<'play' | 'pause' | null>(null);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  // Auto-hide controls
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }
    if (isPlaying && !isScrubbing) {
      hideTimerRef.current = window.setTimeout(() => {
        setShowControls(false);
        setShowVolumeSlider(false);
      }, 2400);
    }
  }, [isPlaying, isScrubbing]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setIsPlaying(true);
      setCenterAction('play');
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setCenterAction('pause');
    }
    resetHideTimer();
  }, [resetHideTimer]);

  // Handle Playback rate
  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
    resetHideTimer();
  };

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    resetHideTimer();
  };

  // Handle Volume change
  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    setIsMuted(clamped === 0);
    if (videoRef.current) {
      videoRef.current.volume = clamped;
      videoRef.current.muted = clamped === 0;
    }
    resetHideTimer();
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Scrubbing
  const calculateScrubTime = useCallback((clientX: number) => {
    if (!progressRef.current || !duration) return 0;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return ratio * duration;
  }, [duration]);

  const handleSeekStart = (clientX: number) => {
    setIsScrubbing(true);
    const newTime = calculateScrubTime(clientX);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (!isScrubbing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newTime = calculateScrubTime(e.clientX);
      setCurrentTime(newTime);
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
    };

    const handleMouseUp = () => {
      setIsScrubbing(false);
      resetHideTimer();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        const newTime = calculateScrubTime(e.touches[0].clientX);
        setCurrentTime(newTime);
        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
        }
      }
    };

    const handleTouchEnd = () => {
      setIsScrubbing(false);
      resetHideTimer();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isScrubbing, calculateScrubTime, resetHideTimer]);

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPosition(ratio * 100);
    setHoverTime(ratio * duration);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
          resetHideTimer();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
          resetHideTimer();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, togglePlay, duration, resetHideTimer]);

  // Video timeupdate and progress
  const onTimeUpdate = () => {
    if (!videoRef.current || isScrubbing) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.buffered.length > 0) {
      const buffEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBuffered(duration ? (buffEnd / duration) * 100 : 0);
    }
  };

  const onLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    videoRef.current.play().then(() => {
      setIsPlaying(true);
      resetHideTimer();
    }).catch(() => {
      setIsPlaying(false);
    });
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  if (!project || !project.videoUrl) return null;

  return (
    <div className="vm-backdrop" onClick={onClose}>
      <div 
        ref={containerRef}
        className={`vm-container ${isFullscreen ? 'vm-fullscreen' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetHideTimer}
        onTouchStart={resetHideTimer}
      >
        {/* Glow ambient background aura */}
        <div className="vm-ambient-glow" />

        {/* Video Screen */}
        <div className="vm-video-wrapper" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.posterUrl}
            playsInline
            loop
            className="vm-video-element"
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Animated Play/Pause Center Glyph */}
          {centerAction && (
            <div 
              key={centerAction + currentTime} 
              className="vm-center-glyph"
              onAnimationEnd={() => setCenterAction(null)}
            >
              {centerAction === 'play' ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="2" />
                  <rect x="14" y="4" width="4" height="16" rx="2" />
                </svg>
              )}
            </div>
          )}
        </div>

        {/* Minimal Floating Top Header */}
        <div className={`vm-top-bar ${showControls ? 'vm-visible' : 'vm-hidden'}`}>
          <div className="vm-meta-pill">
            <span className="vm-category-dot" />
            <span className="vm-meta-category">{project.category}</span>
            <span className="vm-meta-divider">/</span>
            <span className="vm-meta-title">{project.title}</span>
          </div>

          <button 
            className="vm-close-btn" 
            onClick={onClose} 
            aria-label="Close video player"
            title="Close (Esc)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Minimal Floating Bottom Dock */}
        <div 
          className={`vm-bottom-dock ${showControls ? 'vm-visible' : 'vm-hidden'}`}
          onMouseEnter={() => {
            if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
          }}
          onMouseLeave={resetHideTimer}
        >
          {/* Scrubber Progress Bar */}
          <div 
            ref={progressRef}
            className="vm-progress-track"
            onMouseDown={(e) => handleSeekStart(e.clientX)}
            onTouchStart={(e) => handleSeekStart(e.touches[0].clientX)}
            onMouseMove={handleProgressHover}
            onMouseLeave={() => setHoverTime(null)}
          >
            <div className="vm-buffer-bar" style={{ width: `${buffered}%` }} />
            <div className="vm-progress-fill" style={{ width: `${progressPercent}%` }}>
              <div className="vm-scrub-thumb" />
            </div>

            {hoverTime !== null && (
              <div className="vm-hover-tooltip" style={{ left: `${hoverPosition}%` }}>
                {formatTime(hoverTime)}
              </div>
            )}
          </div>

          {/* Controls row */}
          <div className="vm-controls-row">
            <div className="vm-controls-left">
              {/* Play/Pause Button */}
              <button 
                className="vm-icon-btn vm-play-btn" 
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="2" />
                    <rect x="14" y="5" width="4" height="14" rx="2" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                )}
              </button>

              {/* Time display */}
              <div className="vm-time-display">
                <span className="vm-time-current">{formatTime(currentTime)}</span>
                <span className="vm-time-separator">/</span>
                <span className="vm-time-duration">{formatTime(duration)}</span>
              </div>
            </div>

            <div className="vm-controls-right">
              {/* Playback rate pill */}
              <button 
                className="vm-pill-btn" 
                onClick={cyclePlaybackRate}
                title="Playback Speed"
                aria-label={`Playback speed: ${playbackRate}x`}
              >
                {playbackRate}x
              </button>

              {/* Volume / Mute with mini slider */}
              <div 
                className="vm-volume-wrapper"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button 
                  className="vm-icon-btn" 
                  onClick={toggleMute}
                  aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                  title="Mute (M)"
                >
                  {isMuted || volume === 0 ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"></polygon>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                  )}
                </button>

                <div className={`vm-volume-popup ${showVolumeSlider ? 'vm-vol-open' : ''}`}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="vm-volume-slider"
                    aria-label="Volume level"
                  />
                </div>
              </div>

              {/* Fullscreen Toggle */}
              <button 
                className="vm-icon-btn" 
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title="Fullscreen (F)"
              >
                {isFullscreen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 14 10 14 10 20"></polyline>
                    <polyline points="20 10 14 10 14 4"></polyline>
                    <line x1="14" y1="10" x2="21" y2="3"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
