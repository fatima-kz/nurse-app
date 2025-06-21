# Google OAuth Setup Instructions

## 1. Set up Google OAuth in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Select "Web application"
   - Add authorized redirect URIs:
     - `https://pgzuocgijlzzdupvxwdz.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for development)

## 2. Configure Supabase Authentication

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Add your Google OAuth credentials:
   - Client ID: (from Google Cloud Console)
   - Client Secret: (from Google Cloud Console)
5. Save the configuration

## 3. Set up Database Schema

Run the SQL commands from `database-setup.sql` in your Supabase SQL editor:

1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `database-setup.sql`
3. Click "Run" to execute all the commands

This will create:
- `users` table for user profiles
- `questions` table for practice questions
- `test_results` table for storing test scores
- Row Level Security policies
- Sample questions

## 4. Test the Authentication

1. Run the development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Register" or "Login"
4. You should be redirected to Google OAuth
5. After successful authentication, you'll be redirected to the dashboard

## 5. Environment Variables

Make sure your `.env.local` file contains:
```
NEXT_PUBLIC_SUPABASE_URL=https://pgzuocgijlzzdupvxwdz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnenVvY2dpamx6emR1cHZ4d2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTYyNzQsImV4cCI6MjA2NTY3MjI3NH0.Z06TLDiUftmip4MAWCCB9zFjciOwAyhM3TMhGbKpCJo
```

## Notes

- The middleware will automatically redirect unauthenticated users to the auth page when they try to access protected routes (/dashboard, /test)
- Authenticated users will be redirected away from the auth page to the dashboard
- User profiles are automatically created when users sign up
- The database includes sample nursing questions for testing
