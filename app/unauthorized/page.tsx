'use client';

import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="mb-8 flex justify-between w-full max-w-md">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-col items-center justify-center max-w-md text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg mb-8">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => router.push('/')}>
            Return to Home
          </Button>
          <Button variant="outline" onClick={() => router.push('/select-dashboard')}>
            Select Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
} 