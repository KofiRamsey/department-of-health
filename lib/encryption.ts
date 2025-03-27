import crypto from 'crypto';

// Get the encryption key from environment or use a fallback (in production, always use environment variable)
const getEncryptionKey = () => {
  const key = process.env.SESSION_SECRET;
  if (!key || key.length < 32) {
    // In development, we can use a fallback
    if (process.env.NODE_ENV !== 'production') {
      return 'a-development-encryption-key-thats-32-chars';
    }
    console.warn('Warning: SESSION_SECRET is not set or is less than 32 characters');
    return 'fallback-encryption-key-thats-32-chars';
  }
  // Ensure the key is exactly 32 bytes (for AES-256)
  return key.substring(0, 32);
};

// Encrypt data using AES-256-GCM
export function encrypt(text: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // For GCM, IV should be 12 bytes
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key), iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Get the auth tag
  const authTag = cipher.getAuthTag().toString('hex');

  // Return iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

// Decrypt data
export function decrypt(encryptedText: string): string {
  const key = getEncryptionKey();
  
  // Split the encrypted text into iv, authTag, and encrypted components
  const [ivHex, authTagHex, encrypted] = encryptedText.split(':');
  
  if (!ivHex || !authTagHex || !encrypted) {
    throw new Error('Invalid encrypted text format');
  }

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key), iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Simple function to verify the encryption is working
export function testEncryption() {
  const original = 'This is a test message';
  const encrypted = encrypt(original);
  const decrypted = decrypt(encrypted);
  
  if (original === decrypted) {
    return { success: true, message: 'Encryption test passed' };
  } else {
    return { success: false, message: 'Encryption test failed' };
  }
} 