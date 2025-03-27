'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">
            You don't have permission to access this page.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            You might be seeing this page because:
          </p>
          <ul className="list-disc text-sm text-gray-500 pl-5 space-y-1">
            <li>You're trying to access a page that requires different permissions</li>
            <li>Your session has expired</li>
            <li>There might be an issue with your authentication cookies</li>
          </ul>

          <div className="pt-4 space-y-3">
            <Button
              onClick={() => router.push('/login')}
              className="w-full"
            >
              Go to Login
            </Button>
            
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 