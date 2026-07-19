"use client";
import { useEffect } from "react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h2 className="mb-2 text-2xl font-bold text-gray-900">We couldn&apos;t load your dashboard</h2>
      <p className="mb-6 max-w-md text-gray-600">Your projects are unchanged. Try loading the dashboard again.</p>
      <button
        onClick={() => reset()}
        className="btn-primary px-6"
      >
        Try again
      </button>
    </div>
  );
}
