# Blog App

A simple blog web application built with React.js v19, TypeScript, Redux, and Supabase.

## Features

- User registration and login (email confirmation disabled)
- Create, read, update, delete blogs
- Blog listing with pagination
- Responsive design

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a Supabase project at https://supabase.com
4. In Supabase dashboard:
   - Go to Authentication > Settings
   - Disable "Enable email confirmations"
   - Create a table named `blogs` with the following schema:
     ```sql
     CREATE TABLE blogs (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       title TEXT NOT NULL,
       content TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
     );
     ```
   - Enable Row Level Security (RLS) on the blogs table
   - Create policies for CRUD operations (allow authenticated users to manage their own blogs)
5. Copy `.env.example` to `.env` and fill in your Supabase URL and anon key
6. Run the development server: `npm run dev`

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

### Other Platforms

Similar process for Netlify, Cloudflare Pages, etc. Just set the environment variables.

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit
- Supabase
- React Router
- Vite
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
