
'use client'

import React from 'react'

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={(e) => {
        // Fallback logo with gradient background
        e.currentTarget.outerHTML = `
          <div className="h-24 w-24 rounded-2xl shadow-2xl border-2 border-white/20 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">DR</span>
          </div>
        `;
      }}
    />
  );
};

export default ImageWithFallback;


