"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MailIcon, KeyIcon, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { DebugAuth } from "@/components/auth/debug-auth";

// Error messages mapping
const errorMessages = {
  "CredentialsSignin": "Invalid email or password",
  "callback": "Invalid callback URL",
  "default": "An error occurred during sign in",
  "middleware_error": "Authentication service is unavailable. Please try again.",
  "OAuthAccountNotLinked": "Email already exists with a different provider",
  "EmailSignin": "Check your email for a sign in link",
  "SessionRequired": "You must be signed in to access this page"
};

// Component that uses search params - must be wrapped in Suspense
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const message = searchParams.get("message");
  const error = searchParams.get("error");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  
  useEffect(() => {
    // Handle URL errors and messages
    if (error) {
      setFormError(errorMessages[error as keyof typeof errorMessages] || errorMessages.default);
    } else if (message) {
      if (message.includes("success")) {
        setSuccess(message);
      } else {
        setFormError(message);
      }
    }
  }, [message, error]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");
    setSuccess("");
    
    try {
      // Get the callback URL from the URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const urlCallbackParam = urlParams.get("callbackUrl");
      
      console.log(`Attempting sign in for ${email}, URL callback: ${urlCallbackParam}, prop callback: ${callbackUrl}`);
      
      // Use redirect: true for admin and test accounts for direct server-side redirection
      // This is more reliable in production and ensures cookies are properly set
      if (email === "admin@health.example.com") {
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/admin"
        });
        return; // No need to continue execution
      } else if (email === "doctor@health.example.com") {
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/doctor"
        });
        return; // No need to continue execution
      } else if (email === "patient@health.example.com") {
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/patient"
        });
        return; // No need to continue execution
      }
      
      // For other accounts, continue with manual handling
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });
      
      console.log("Sign in result:", result);
      
      if (result?.error) {
        setFormError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }
      
      if (result?.ok) {
        setSuccess("Login successful! Redirecting...");
        
        // Direct role-based redirection
        let destinationUrl = '/';
        
        // Priority order: 
        // 1. URL callback parameter
        // 2. Default homepage
        if (urlCallbackParam && urlCallbackParam !== "/" && !urlCallbackParam.includes("login")) {
          // Use the callback from URL directly, handle URL encoding
          destinationUrl = decodeURIComponent(urlCallbackParam);
        } else if (callbackUrl && callbackUrl !== "/" && !callbackUrl.includes("login")) {
          destinationUrl = callbackUrl;
        }
        
        console.log(`Redirecting user to: ${destinationUrl}`);
        
        // Use replace for a cleaner browser history and more forceful redirect
        setTimeout(() => {
          window.location.replace(destinationUrl);
        }, 500);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setFormError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };
  
  const handleDemoLogin = async (type: string) => {
    setIsLoading(true);
    setFormError("");
    let email = "";
    let password = "";
    let destinationUrl = "/";
    
    switch(type) {
      case "admin":
        email = "admin@health.example.com";
        password = "Admin123!";
        destinationUrl = "/admin";
        break;
      case "doctor":
        email = "doctor@health.example.com";
        password = "Doctor123!";
        destinationUrl = "/doctor";
        break;
      case "patient":
        email = "patient@health.example.com";
        password = "Patient123!";
        destinationUrl = "/patient";
        break;
    }
    
    try {
      console.log(`Attempting demo login as ${type}`);
      
      // Using server-side redirect for demo logins
      // This ensures cookies are properly set by letting NextAuth handle the flow
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: destinationUrl
      });
      
      // This code won't execute when redirect:true is used
      setSuccess(`Successfully logged in as ${type}! Redirecting...`);
    } catch (error) {
      console.error("Demo login error:", error);
      setFormError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link href="/register" className="text-primary hover:text-primary/90">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {formError && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {formError}
            </div>
          )}
          
          {success && (
            <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {success}
            </div>
          )}
          
          {/* Debug information - remove in production when fixed */}
          <div className="mb-4 text-xs bg-gray-50 p-3 rounded text-gray-500 overflow-auto max-h-20">
            <div>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</div>
            <div>Callback URL: {callbackUrl || 'None'}</div>
            <div>Search Params: {typeof window !== 'undefined' ? window.location.search : 'N/A'}</div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link href="#" className="text-primary hover:text-primary/90">
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <div>
              <Button
                type="submit"
                className="w-full py-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Test Accounts
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 gap-3">
              <Button 
                onClick={() => handleDemoLogin("admin")}
                variant="outline"
                className="flex justify-center"
                disabled={isLoading}
              >
                Admin Login
              </Button>
              
              <Button 
                onClick={() => handleDemoLogin("doctor")}
                variant="outline"
                className="flex justify-center"
                disabled={isLoading}
              >
                Doctor Login
              </Button>
              
              <Button 
                onClick={() => handleDemoLogin("patient")}
                variant="outline"
                className="flex justify-center"
                disabled={isLoading}
              >
                Patient Login
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <Link href="/" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Back to Home
              </Link>
            </div>
          </div>
          
          <DebugAuth />
        </div>
      </div>
    </div>
  );
}

// Main page component wrapping with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
