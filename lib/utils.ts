import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get absolute URL for image paths
 * Works in both development and production
 */
export function getImageUrl(path: string): string {
  // For absolute URLs, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // In development, use relative path
  if (process.env.NODE_ENV === 'development') {
    return normalizedPath;
  }
  
  // In production, use the full URL
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
    : '';
    
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Get a fallback URL for images
 * Used when the primary image fails to load
 */
export function getFallbackImageUrl(path: string): string {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `https://msebetsi-department-of-health.vercel.app${normalizedPath}`;
}
