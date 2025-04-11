// app/loading.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Loading() {
  const router = useRouter();

  // Optional: Reset progress bar when navigation completes
  useEffect(() => {
    const handleComplete = () => {
      // You can add any cleanup logic here if needed
    };
    
    return () => {
      handleComplete();
    };
  }, [router]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1 bg-blue-500 animate-progress" />
    </div>
  );
}

// Optional: Add this to your global CSS (e.g., app/globals.css)
export const styles = `
  @keyframes progress {
    0% {
      width: 0%;
    }
    50% {
      width: 50%;
    }
    100% {
      width: 100%;
    }
  }

  .animate-progress {
    animation: progress 2s infinite;
  }
`;