'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createSessionCookie } from '@/lib/session';

export function DebugAuth() {
  const [cookies, setCookies] = useState<string[]>([]);
  const [sessionData, setSessionData] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);

  // Function to refresh cookie info
  const refreshCookieInfo = () => {
    // Get all cookies
    const allCookies = document.cookie.split(';').map(cookie => cookie.trim());
    setCookies(allCookies);

    // Try to find and parse our session cookie
    const sessionCookie = allCookies.find(cookie => cookie.startsWith('session='));
    if (sessionCookie) {
      try {
        const cookieValue = sessionCookie.split('=')[1];
        fetch('/api/auth/debug-session')
          .then(res => res.json())
          .then(data => {
            setSessionData(data.session || null);
          })
          .catch(err => {
            console.error('Error fetching session data:', err);
          });
      } catch (error) {
        console.error('Error parsing session cookie:', error);
      }
    } else {
      setSessionData(null);
    }
  };

  useEffect(() => {
    refreshCookieInfo();
  }, []);

  // Function to set a test cookie
  const handleSetTestCookie = () => {
    document.cookie = `test-cookie=debug-value;path=/;max-age=3600`;
    refreshCookieInfo();
    alert('Test cookie set! Check the cookies list.');
  };

  // Function to set an admin session cookie
  const handleSetAdminCookie = () => {
    try {
      // Admin user data
      const adminData = {
        user: {
          id: 'admin-id',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
        }
      };

      // Create cookie string
      const cookieString = createSessionCookie(adminData, { 
        httpOnly: false, // Make it visible to JS for debugging
        secure: false,   // Allow on non-HTTPS for local testing
      });

      // Set the cookie
      document.cookie = cookieString;
      
      alert('Admin session cookie set!');
      refreshCookieInfo();
      window.location.reload(); // Reload to update the cookie display
    } catch (error) {
      console.error('Error setting admin cookie:', error);
      alert(`Failed to set admin cookie: ${error}`);
    }
  };

  // Function to sign out by clearing all auth cookies
  const handleClearCookies = () => {
    // Clear potential auth cookies with different attributes to ensure complete removal
    document.cookie = 'session=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'next-auth.session-token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'next-auth.csrf-token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'next-auth.callback-url=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    refreshCookieInfo();
    alert('All authentication cookies cleared!');
  };

  if (!showDebug) {
    return (
      <div className="mt-4 text-center">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setShowDebug(true)}
          className="text-xs bg-gray-100"
        >
          Show Debug Tools
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">Auth Debug Information</h3>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setShowDebug(false)}
          className="text-xs"
        >
          Hide Debug
        </Button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleSetTestCookie}
            className="text-xs mr-2"
          >
            Set Test Cookie
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleSetAdminCookie}
            className="text-xs bg-green-50 hover:bg-green-100 text-green-700"
          >
            Set Admin Cookie
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleClearCookies}
            className="text-xs bg-red-50 hover:bg-red-100 text-red-700"
          >
            Clear All Cookies
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={refreshCookieInfo}
            className="text-xs"
          >
            Refresh
          </Button>
        </div>

        <div className="mt-2">
          <h4 className="font-semibold mb-1">Current Cookies:</h4>
          {cookies.length > 0 ? (
            <ul className="list-disc list-inside">
              {cookies.map((cookie, index) => (
                <li key={index} className="break-all">{cookie}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No cookies found</p>
          )}
        </div>

        <div className="mt-2">
          <h4 className="font-semibold mb-1">Session Data:</h4>
          {sessionData ? (
            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(sessionData, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">No session data found</p>
          )}
        </div>

        <div className="mt-2 text-gray-500">
          <p>Current location: {typeof window !== 'undefined' ? window.location.href : ''}</p>
          <p>Base URL: {typeof window !== 'undefined' ? window.location.origin : ''}</p>
        </div>
      </div>
    </div>
  );
} 