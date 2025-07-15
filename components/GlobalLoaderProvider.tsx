"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BrandLoader from "@/components/ui/BrandLoader";

const GlobalLoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700); // Show loader for 700ms
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-lg transition-opacity duration-300">
          <BrandLoader />
        </div>
      )}
      {children}
    </>
  );
};

export default GlobalLoaderProvider; 