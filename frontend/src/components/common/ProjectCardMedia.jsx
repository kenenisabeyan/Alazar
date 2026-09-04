import React, { useState } from 'react';
import { Film, Play } from 'lucide-react';
import ProjectImage from './ProjectImage';

export const ProjectCardMedia = ({ project, className = '', showOverlays = true }) => {
  const [videoError, setVideoError] = useState(false);

  const videoUrl = project.previewVideoUrl || project.preview_video_url;
  const isVideo = !!(videoUrl && !videoError);

  if (isVideo) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#120407] select-none ${className}`}>
        {/* Clean Video Playback */}
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Minimal Dark Corner Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Live Reel Corner Indicator (Clean, non-intrusive) */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-wider text-white shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE REEL</span>
          </div>
        </div>

        {/* Center Viewfinder Reticle (Only on hover) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center bg-black/40 backdrop-blur-sm shadow-xl">
            <Play size={16} className="text-white ml-0.5 fill-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProjectImage
      src={project.thumbnail}
      title={project.title}
      category={project.category}
      subCategory={project.subCategory || project.sub_category || project.category}
      className={`w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out ${className}`}
    />
  );
};

export default ProjectCardMedia;


