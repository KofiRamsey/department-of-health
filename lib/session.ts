import { serialize, parse } from 'cookie';
import { encrypt, decrypt } from './encryption';

/**
 * This is a simplified implementation of a stateless session
 * based on the NextJS authentication docs
 */

// Helper to create session cookies
export function createSessionCookie(sessionData: any, options: any = {}) {
  // Encrypt session data
  const encryptedSessionData = encrypt(JSON.stringify(sessionData));
  
  // Set default cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
    sameSite: 'lax',
    ...options,
  };
  
  // Serialize the cookie
  return serialize('session', encryptedSessionData, cookieOptions);
}

// Helper to read session from cookie
export function getSessionFromCookie(cookieString: string | null) {
  if (!cookieString) return null;
  
  // Parse cookies
  const cookies = parse(cookieString);
  
  // Check if session cookie exists
  if (!cookies.session) return null;
  
  try {
    // Decrypt session data
    const decryptedSession = decrypt(cookies.session);
    return JSON.parse(decryptedSession);
  } catch (error) {
    console.error('Error decrypting session:', error);
    return null;
  }
}

// Helper to clear session
export function clearSessionCookie(options: any = {}) {
  return serialize('session', '', {
    maxAge: -1,
    path: '/',
    ...options,
  });
}

// Create encryption functions that use a secret key
function encrypt(text: string): string {
  // This is a simplified version. You should use a proper encryption library in production
  // For example: iron-session or jose
  // In this basic example, we'll just encode with base64
  const secret = process.env.SESSION_SECRET || 'your-secret-key';
  return Buffer.from(`${text}${secret}`).toString('base64');
}

function decrypt(encryptedText: string): string {
  // Decrypt the text using your secret
  const secret = process.env.SESSION_SECRET || 'your-secret-key';
  const decoded = Buffer.from(encryptedText, 'base64').toString();
  // Remove the secret from the end
  return decoded.slice(0, decoded.length - secret.length);
} 