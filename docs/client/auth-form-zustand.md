# Task: Implement Frontend Auth Integration & Protected Routes

**Context:**
I have the Login and Signup screens (UI) ready. I need to implement the full Authentication flow, including Global State, Protected Routes (Middleware), and a Dashboard page.

**Tech Stack:**
- **Framework:** Next.js (App Router).
- **Form:** `react-hook-form` + `zod` + `@hookform/resolvers/zod`.
- **State:** `zustand` (User Session).
- **UI:** `shadcn/ui`.

**Backend Reference:**
- you can see module for more precision on `@/docs/server/modules/auth.md`
- `POST /auth/signin` (Sets HttpOnly cookie named 'token').
- `POST /auth/signup`.
- `GET /auth/me` (Validates cookie and returns user data).

**Requirements:**

### 1. Global Auth Store (`stores/useAuthStore.ts`)
Create a Zustand store.
- **State:** `user` (User | null), `isLoading` (boolean).
- **Actions:**
  - `login(email, password)`: Calls API -> Updates `user` -> Router.push('/garden').
  - `register(name, email, password)`: Calls API -> Router.push('/garden').
  - `checkAuth()`: Calls `/auth/me`. If 200, sets user. If 401, sets user to null.
  - `logout()`: Calls API -> Resets state -> Router.push('/signin').

### 2. Next.js Middleware (`middleware.ts`)
Create a `middleware.ts` file in the root project folder to protect routes.
- **Logic:**
  - Check for the presence of the cookie named `'token'`.
  - **Protected Routes:** If user tries to access `/garden` (or subpaths) and has NO cookie -> Redirect to `/signin`.
  - **Public Routes:** If user tries to access `/signin` or `/signup` and HAS cookie -> Redirect to `/garden`.
- **Matcher:** Configure it to run on `/garden/:path*`, `/signin`, and `/signup`.

### 3. The Garden Page (`app/garden/page.tsx`)
Create a simple dashboard page acting as the "Home" for logged users.
- **Layout:** A clean page using shadcn components.
- **Content:**
  - A welcome message: "Hello, {user.name}!".
  - A button to "Add new Plant" (just visual for now).
  - A "Logout" button that calls the store's logout action.
- **State Sync:** Inside a `useEffect` (or a specific AuthProvider component), ensure `checkAuth()` is called on mount to hydrate the Zustand store with user data from the server.

### 4. Login Integration
Refactor `app/signin/page.tsx` (or your login component) to use the store.
- Use `react-hook-form` to handle input.
- On Submit: Call `useAuthStore.getState().login(data)`.
- Handle loading state and errors.

**Action:**
Please generate the code for:
1. `stores/useAuthStore.ts`
2. `middleware.ts` (Next.js Edge Middleware)
3. `app/garden/page.tsx`
4. The Logic for the Login Form.