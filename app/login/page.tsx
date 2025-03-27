"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';

  // Quick login functions for testing
  const handleQuickLogin = async (role: string) => {
    setIsLoading(true);
    try {
      // Use our new direct login endpoint
      const response = await fetch(`/api/auth/direct-login?role=${role}&redirect=${callbackUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.redirected) {
        // If we got redirected, follow the redirect
        window.location.href = response.url;
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      router.push(callbackUrl);
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Form validation
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      // Determine role based on email for testing
      let role = '';
      if (email.includes('admin')) role = 'admin';
      else if (email.includes('doctor')) role = 'doctor';
      else if (email.includes('patient')) role = 'patient';
      else throw new Error('Invalid email format for test accounts');

      await handleQuickLogin(role);
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      {/* Debug information */}
      <div className="fixed top-0 left-0 right-0 bg-yellow-100 p-2 text-xs text-yellow-800">
        Current URL: {typeof window !== 'undefined' ? window.location.href : ''}
        <br />
        Callback URL: {callbackUrl}
        <br />
        <Button
          size="sm"
          variant="outline" 
          className="bg-red-50 hover:bg-red-100 text-red-700 mt-1"
          onClick={() => router.push('/admin')}
        >
          WORKAROUND: Go directly to /admin
        </Button>
      </div>

      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Quick login options */}
          <div className="space-y-2 mb-4">
            <div className="text-sm font-medium text-gray-500 mb-2">Quick login as:</div>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline"
                className="bg-blue-50 hover:bg-blue-100 text-blue-700"
                onClick={() => handleQuickLogin('admin')}
                disabled={isLoading}
              >
                Admin
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="bg-green-50 hover:bg-green-100 text-green-700"
                onClick={() => handleQuickLogin('doctor')}
                disabled={isLoading}
              >
                Doctor
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="bg-purple-50 hover:bg-purple-100 text-purple-700"
                onClick={() => handleQuickLogin('patient')}
                disabled={isLoading}
              >
                Patient
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@health.example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-gray-500 text-center w-full">
            Don't have an account?{' '}
            <Link href="/register" className="underline text-blue-600 hover:text-blue-800">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
