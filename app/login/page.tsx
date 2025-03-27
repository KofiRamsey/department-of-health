"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MailIcon, KeyIcon, Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const message = searchParams.get("message");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  useEffect(() => {
    if (message) {
      if (message.includes("success")) {
        setSuccess(message);
      } else {
        setError(message);
      }
    }
  }, [message]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      console.log("Attempting sign in with:", { email, password });
      
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });
      
      console.log("Sign in result:", result);
      
      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }
      
      if (result?.ok) {
        // Get user role and redirect to appropriate dashboard
        if (email === "admin@health.example.com") {
          router.push("/admin");
        } else if (email === "doctor@health.example.com") {
          router.push("/doctor");
        } else if (email === "patient@health.example.com") {
          router.push("/patient");
        } else {
          // For database users or fallback
          router.push(result.url || "/");
        }
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };
  
  const handleDemoLogin = async (type: string) => {
    setIsLoading(true);
    let email = "";
    let password = "";
    
    switch(type) {
      case "admin":
        email = "admin@health.example.com";
        password = "Admin123!";
        break;
      case "doctor":
        email = "doctor@health.example.com";
        password = "Doctor123!";
        break;
      case "patient":
        email = "patient@health.example.com";
        password = "Patient123!";
        break;
    }
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });
      
      if (result?.error) {
        setError("Failed to login with demo account");
        setIsLoading(false);
        return;
      }
      
      if (result?.ok) {
        // Direct redirection based on type
        switch(type) {
          case "admin":
            router.push("/admin");
            break;
          case "doctor":
            router.push("/doctor");
            break;
          case "patient":
            router.push("/patient");
            break;
          default:
            router.push("/");
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
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
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {success}
            </div>
          )}
          
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
              <div className="grid grid-cols-1 gap-2">
                <Button
                  onClick={() => handleDemoLogin("admin")}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Login as Admin
                </Button>
                <Button
                  onClick={() => handleDemoLogin("doctor")}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Login as Doctor
                </Button>
                <Button
                  onClick={() => handleDemoLogin("patient")}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Login as Patient
                </Button>
              </div>
              <div className="text-xs text-gray-500 text-center mt-3">
                <p><strong>Admin:</strong> admin@health.example.com / Admin123!</p>
                <p><strong>Doctor:</strong> doctor@health.example.com / Doctor123!</p>
                <p><strong>Patient:</strong> patient@health.example.com / Patient123!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
