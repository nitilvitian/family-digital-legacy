/**
 * Google OAuth Configuration
 * Client ID: 92519325035-7cq61e3eqoqs05mfa5028jm6u6rm9ji5.apps.googleusercontent.com
 */

export const googleAuthConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI || 'http://localhost:3000/auth/callback/google',
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
};

export const googleDriveConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID,
  scopes: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly',
  ],
};
