import React from "react";

/**
 * BrandLoader displays a modern, branded loading animation with a spinner and animated 'AFabric' text.
 * Uses peach accent color and smooth fade/scale animation for a premium look.
 * Accessible with aria-live and role attributes.
 */
const BrandLoader: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Spinner */}
      <div className="relative mb-6">
        <div className="w-20 h-20 border-4 border-peach-400 border-t-transparent rounded-full animate-spin shadow-lg" />
        {/* Peach dot in the center */}
        <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-peach-400 rounded-full shadow -translate-x-1/2 -translate-y-1/2" />
      </div>
      {/* Animated brand text */}
      <span className="text-3xl sm:text-4xl font-black text-peach-700 tracking-tight animate-pulse drop-shadow-lg select-none">
        AFabric
      </span>
    </div>
  );
};

export default BrandLoader; 