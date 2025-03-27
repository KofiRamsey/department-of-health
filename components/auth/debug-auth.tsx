'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function DebugAuth() {
  const [showDebug, setShowDebug] = useState(false);
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="mt-8 border-t pt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Authentication Debug</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowDebug(false)}
          className="text-xs"
        >
          Hide
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkAuth} 
            disabled={loading}
            className="text-xs"
          >
            {loading ? 'Checking...' : 'Check Auth Status'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.location.href = '/api/auth/signin'}
            className="text-xs"
          >
            Auth Signin Page
          </Button>
        </div>
        
        {error && (
          <div className="p-2 bg-red-50 text-red-700 text-xs rounded">
            Error: {error}
          </div>
        )}
        
        {authStatus && (
          <div className="p-2 bg-gray-50 text-gray-800 text-xs rounded">
            <div><strong>Status:</strong> {authStatus.status}</div>
            {authStatus.user && (
              <>
                <div><strong>User:</strong> {authStatus.user.email}</div>
                <div><strong>Role:</strong> {authStatus.user.role}</div>
              </>
            )}
            <div><strong>CSRF Token:</strong> {authStatus.csrfToken ? 'Present' : 'Missing'}</div>
          </div>
        )}
        
        <div>
          <h4 className="text-xs font-medium mb-1">Auth Cookies:</h4>
          <div className="p-2 bg-gray-50 text-gray-800 text-xs rounded max-h-24 overflow-y-auto">
            {checkCookies().length > 0 ? (
              <ul className="list-disc list-inside">
                {checkCookies().map((cookie, i) => (
                  <li key={i}>{cookie.split('=')[0]}: {cookie.split('=')[1]?.substring(0, 10)}...</li>
                ))}
              </ul>
            ) : (
              <p>No auth cookies found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 