'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { requireRole } from "@/lib/auth-utils";
import Link from "next/link";
import { db } from "@/lib/db";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    // If authentication is still loading, wait
    if (status === 'loading') return;
    
    // Check if user is authenticated and has the right role
    if (!session) {
      setShowWarning(true);
    } else if (session.user.role !== 'ADMIN') {
      router.push('/unauthorized');
    }
  }, [session, status, router]);
  
  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  if (showWarning) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-yellow-50 p-8">
        <div className="max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-yellow-700">Authentication Warning</h1>
          <p className="mb-4">
            You're accessing the admin dashboard without proper authentication. 
            This might be due to cookie issues in the deployment environment.
          </p>
          <p className="mb-6 text-sm text-gray-600">
            You can continue to use the admin dashboard, but some features may not work correctly.
          </p>
          <button 
            onClick={() => setShowWarning(false)}
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
          >
            Continue to Admin Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <div className="mb-6">
            <p className="text-gray-600">
              {session ? (
                <>Logged in as: <span className="font-medium">{session.user.email}</span> (Admin)</>
              ) : (
                "Not authenticated"
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">User Management</h2>
              <p className="text-gray-600 mb-4">Manage system users and their permissions</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                View Users
              </button>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Appointment Overview</h2>
              <p className="text-gray-600 mb-4">View and manage all appointments</p>
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                View Appointments
              </button>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">System Settings</h2>
              <p className="text-gray-600 mb-4">Configure system settings and preferences</p>
              <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
                View Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat card component
function StatCard({ title, value, link }: { title: string; value: number; link: string }) {
  return (
    <Link href={link} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </Link>
  );
} 