'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Something went wrong!</h2>
        <p className="mt-2 text-lg text-gray-600">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-3">
          <button
            onClick={() => reset()}
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
} 