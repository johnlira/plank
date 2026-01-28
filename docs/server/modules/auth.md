# Task: Implement Auth Module (JWT + HTTPOnly Cookies)

**Context:**
I need to implement the `auth` module in the server application. The goal is to handle user registration and session management using JWTs stored strictly in HTTP-Only cookies (stateless session) for security.

**Architectural Standards:**
- **Path:** `src/modules/auth/`
- **Pattern:** Repository-Service-Controller (as defined in `backend-architecture.md`).
- **Database:** Raw SQL with `pg` driver (Table: `users`).
- **Validation:** `zod` schemas.

**Requirements:**

### 1. File Structure & Responsibilities

#### A. `auth.types.ts`
- Define Zod Schemas for validation:
  - `SignUpSchema`: name, email (email format), password (min 6 chars).
  - `SignInSchema`: email, password.
- Export inferred TypeScript interfaces from these schemas.

#### B. `auth.repository.ts` (Data Access)
- **`create(user)`**: Insert user into DB. Return the created user (excluding password).
- **`findByEmail(email)`**: Return user with password_hash (for login check) or null.
- **`findById(id)`**: Return user (excluding password) for the `/me` route.

#### C. Services (`modules/auth/services/`)
- **`signup.ts`**:
  - Check if email already exists (throw error if true).
  - Hash password using `bcryptjs`.
  - Call repository to create user.
- **`signin.ts`**:
  - Check if user exists.
  - Compare password using `bcryptjs.compare`.
  - If valid, generate a JWT token (using `jsonwebtoken`) with `userId` in payload.
  - Return `{ user, token }`.

#### D. `auth.controller.ts` (Cookie Management)
- **`signUp`**:
  - Call service.
  - Return `201 Created`.
- **`signIn`**:
  - Call service.
  - **Crucial:** Set the JWT in a cookie named `'token'`.
  - Cookie Options: `{ httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }`.
  - Return user info (JSON).
- **`logout`**:
  - Clear the `'token'` cookie.
  - Return `200 OK`.
- **`getMe`**:
  - This endpoint will be protected. It should return the currently logged-in user data based on the token in the cookie.

#### E. `auth.routes.ts`
- `POST /signup`
- `POST /signin`
- `POST /logout`
- `GET /me` (Requires a middleware to verify cookie).

### 2. Middleware Requirement
Since we need `/me`, please also create a standalone middleware at `src/middleware/ensureAuthenticated.ts`.
- It should extract the token from `req.cookies.token` (you might need `cookie-parser` installed).
- Verify JWT.
- Attach `userId` to `req.user` (extend Express Request type).
- If invalid/missing, throw 401.

**Dependencies:**
Assume `bcryptjs`, `jsonwebtoken`, `zod`, `pg` are installed.
*Note: If `cookie-parser` is missing, please mention it.*

**Action:**
Generate the code for these files in the following order: Types, Repository, Services, Middleware, Controller, Routes.