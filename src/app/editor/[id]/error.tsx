"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 min-h-screen flex flex-col items-center justify-center bg-ft-gray-soft p-4 text-center">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load editor</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-md">There was a problem loading this project.</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-fekitech-blue text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/dashboard"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
