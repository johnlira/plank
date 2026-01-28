# Backend Modular Architecture

This project follows a strict **Domain-Driven Modular Architecture**. Each feature is encapsulated within its own directory in `modules/`.

## Directory Structure
Example using a hypothetical `users` module:

```text
src/modules/users/
├── services/                 # Business Logic (Single Responsibility)
│   ├── create-user.ts        # One file per specific action
│   ├── get-user-profile.ts
│   └── index.ts              # Exports all services
├── users.controller.ts       # Request/Response handling
├── users.repository.ts       # Raw SQL Queries (Data Access Layer)
├── users.routes.ts           # Express Router definitions
├── users.types.ts            # TypeScript Interfaces & Zod Schemas
└── users.index.ts            # (Optional) Export module entry points
```

---

## Error Handling

### Custom Errors (`err/server-errors.ts`)

All errors extend `ServerError` base class:

| Error Class        | Status | Code              | Usage                        |
|--------------------|--------|-------------------|------------------------------|
| `ValidationError`  | 400    | VALIDATION_ERROR  | Invalid input data           |
| `UnauthorizedError`| 401    | UNAUTHORIZED      | Authentication required      |
| `ForbiddenError`   | 403    | FORBIDDEN         | Access denied                |
| `NotFoundError`    | 404    | NOT_FOUND         | Resource not found           |
| `ConflictError`    | 409    | CONFLICT          | Resource already exists      |

### Usage Pattern (Early Return)

Avoid `try/catch` blocks. Use early return with custom errors:

```typescript
// Services throw custom errors
const user = await repository.findByEmail(email);
if (!user) throw new UnauthorizedError("Invalid credentials");

// Controllers are clean - errors propagate to global handler
async signIn(req: Request, res: Response) {
  const data = req.body as SignInInput;
  const result = await signIn(data);
  return res.json(result);
}
```

### Global Error Handler (`err/error-handler.ts`)

Registered as last middleware in `index.ts`. Catches all `ServerError` instances and formats response.

---

## Middlewares (`src/middleware/`)

### `validateBody.ts`
Validates `req.body` against a Zod schema before reaching the controller.

```typescript
import { validateBody } from "../../middleware/validateBody";
import { SignUpSchema } from "./auth.types";

router.post("/signup", validateBody(SignUpSchema), controller.signUp);
```

### `ensureAuthenticated.ts`
Protects routes requiring authentication. Extracts JWT from `req.cookies.token` and attaches `userId` to `req.user`.

```typescript
router.get("/me", ensureAuthenticated, controller.getMe);
```

---

## Validation (`Zod`)

Define schemas in `*.types.ts` files:

```typescript
import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
```

---

## Express 5

Project uses **Express 5** which natively supports async error handling. No need for `express-async-errors` - thrown errors in async handlers are automatically caught and passed to the error handler.
