import React, { useState } from 'react';
import ProjectImage from './ProjectImage';

export const ProjectCardMedia = ({ project, className = '' }) => {
  const [videoError, setVideoError] = useState(false);

  const videoUrl = project.previewVideoUrl || project.preview_video_url;

  if (videoUrl && !videoError) {
    return (
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        onError={() => setVideoError(true)}
        className={`w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out ${className}`}
      />
    );
  }

  return (
    <ProjectImage
      src={project.thumbnail}
      title={project.title}
      category={project.category}
      subCategory={project.subCategory || project.sub_category || project.category}
      className={`w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out ${className}`}
    />
  );
};

export default ProjectCardMedia;
