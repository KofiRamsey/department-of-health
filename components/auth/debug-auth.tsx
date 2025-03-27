'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';

export function DebugAuth() {
  const [showDebug, setShowDebug] = useState(false);
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get session data from useSession hook
  const { data: session, status: sessionStatus } = useSession();

  // Check authentication status
  const checkAuth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/check');
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      setAuthStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Force clear session
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      window.location.href = '/login'; // Force reload to login page
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Check cookies
  const checkCookies = () => {
    return document.cookie
      .split(';')
      .map(cookie => cookie.trim())
      .filter(cookie => 
        cookie.startsWith('next-auth.session-token=') || 
        cookie.startsWith('next-auth.csrf-token=') ||
        cookie.startsWith('__Secure-next-auth.session-token=')
      );
  };

  useEffect(() => {
    if (showDebug) {
      checkAuth();
    }
  }, [showDebug]);

  if (!showDebug) {
    return (
      <div className="mt-4 text-center">
        <button 
          onClick={() => setShowDebug(true)}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          Debug Authentication
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 border rounded-md bg-gray-50">
      <h3 className="font-semibold mb-2">Authentication Debug</h3>
      
      <div className="mb-4">
        <div className="text-sm mb-1">Session Status: <span className="font-medium">{sessionStatus}</span></div>
        {session && (
          <div className="text-xs mt-1">
            <div>User ID: {session.user?.id || 'Not available'}</div>
            <div>Email: {session.user?.email || 'Not available'}</div>
            <div>Role: {session.user?.role || 'Not available'}</div>
          </div>
        )}
        
        <div className="text-xs mt-2">
          <div>Current URL: <code>{typeof window !== 'undefined' ? window.location.href : ''}</code></div>
          <div>Base URL: <code>{typeof window !== 'undefined' ? window.location.origin : ''}</code></div>
          <div>Environment: <code>{process.env.NODE_ENV || 'unknown'}</code></div>
        </div>
        
        <div className="mt-4">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={checkAuth} 
            disabled={loading}
            className="mr-2"
          >
            {loading ? 'Checking...' : 'Check Server Auth'}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleSignOut}
            className="bg-red-50 hover:bg-red-100 text-red-700"
          >
            Force Sign Out
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="mt-2 text-xs text-red-600">{error}</div>
      )}
      
      {authStatus && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-1">API Auth Status</h4>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(authStatus, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-1">Auth Cookies</h4>
        <div className="text-xs">
          {checkCookies().length > 0 ? (
            <ul className="list-disc pl-4">
              {checkCookies().map((cookie, i) => (
                <li key={i} className="break-all">{cookie}</li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600">No auth cookies found!</p>
          )}
        </div>
      </div>
      
      <button 
        onClick={() => setShowDebug(false)}
        className="mt-4 text-xs text-gray-500 hover:text-gray-700"
      >
        Hide Debug Info
      </button>
    </div>
  );
} 