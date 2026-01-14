# AI Coding Guidelines for Blog App

## Architecture Overview
This is a React 19 blog application with TypeScript, using Redux Toolkit for state management and Supabase for authentication and database operations. The app supports user registration/login, and CRUD operations on blog posts with pagination.

**Key Components:**
- `src/App.tsx`: Main routing setup with React Router
- `src/store/`: Redux store with `authSlice` and `blogSlice` for state management
- `src/utils/supabase.ts`: Supabase client configuration
- `src/pages/`: Page components (Login, Register, BlogList, CreateBlog, EditBlog)
- `src/components/`: Reusable components like Navbar

## State Management Patterns
Use Redux Toolkit async thunks for all Supabase operations. Example from `authSlice.ts`:
```typescript
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  }
);
```
Dispatch thunks in components and handle loading/error states via selectors.

## Supabase Integration
- Database table: `blogs` with columns `id` (UUID), `title`, `content`, `created_at`, `user_id`
- Row Level Security enabled; policies allow users to manage their own blogs
- Auth state synced with Redux via `supabase.auth.onAuthStateChange` in `App.tsx`
- Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Development Workflow
- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check with TSC then build
- `npm run lint`: Run ESLint on TypeScript/React files
- `npm run preview`: Preview production build locally
- Environment setup: Copy `.env.example` to `.env` and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Supabase setup: Create `blogs` table with schema (id UUID, title TEXT, content TEXT, created_at TIMESTAMP, user_id UUID), enable RLS, create policies for user-owned blogs
- Deployment: Push to GitHub, connect repo to Vercel/Netlify, set environment variables in platform dashboard
- Email confirmations disabled in Supabase auth settings for development

## Code Conventions
- TypeScript interfaces for all data structures (e.g., `Blog`, `AuthState`)
- CSS modules or class-based styling in `.css` files alongside components
- Error handling: Catch errors in async thunks and display via Redux state
- Navigation: Use `useNavigate` from React Router after successful auth operations

## File Organization
- Place new pages in `src/pages/`
- Add Redux logic to appropriate slice in `src/store/slices/`
- Utility functions in `src/utils/`
- Components in `src/components/` with paired `.css` files

When adding features, ensure Supabase RLS policies are updated if new tables or operations are introduced.</content>
<parameter name="filePath">d:\CAARL\New folder\.github\copilot-instructions.md