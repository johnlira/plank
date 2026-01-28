# Project Initialization Prompt: Plank MVP

**Role:** Senior Full Stack Engineer & DevOps Specialist
**Objective:** Initialize the "Plank" project repository with a Monorepo structure (Server + Client), Docker infrastructure, and basic configuration using `pnpm`.

---

## 1. Infrastructure (Docker Compose)
Create a `docker-compose.yml` file in the root directory implementing the architecture defined for the project.
* **Services required:**
    * **Postgres:** Latest Alpine image. Set default user/password/db. Persist data in a volume.
    * **Redis:** Latest Alpine image (for future task queues).
    * **Ollama:** Image `ollama/ollama`. Expose port `11434`. Mount a volume to `~/.ollama` to persist models.
* **Networking:** Ensure all services share a bridge network called `plank-network`.

## 2. Package Management & Monorepo Setup
* Initialize a `package.json` in the root.
* **Strictly use `pnpm`** for all package management.
* Install `concurrently` in the root (`devDependencies`) to run client and server simultaneously.
* Add a script in root `package.json`: `"dev": "concurrently \"pnpm --filter server dev\" \"pnpm --filter client dev\""`.

## 3. Server Initialization (`/server`)
Create a folder named `server` and initialize a Node.js project.

* **Dependencies:**
    * `express`, `pino`, `pino-http`, `zod`, `cors`, `pg`
* **Dev Dependencies:**
    * `typescript`, `tsx` (for running TS directly), `@types/node`, `@types/express`, `@types/pg`, `@types/cors`, `pino-pretty`.
* **Configuration:**
    * Generate a basic `tsconfig.json`.
    * Add a script `"dev": "tsx watch index.ts"`.
* **Entry Point (`index.ts`):**
    * Create a simple Express server.
    * Use `pino-http` for logging.
    * Listen on port **3333**.
    * Return a JSON `{ message: "Plank Server Running" }` on the root route `/`.

## 4. Client Initialization (`/client`)
Create a folder named `client` using Next.js.

* **Installation Command:** `pnpm create next-app@latest client -y` (Use default settings).
* **UI Library:** Initialize **shadcn/ui**.
    * Run `pnpm dlx shadcn@latest init` (Use defaults: Slate, CSS Variables).
* **Cleanup:**
    * Modify `app/page.tsx` to remove the default Next.js boilerplate.
    * Render only a centered `<main>` tag with an `<h1>` text: **"Plank"**.

---

**Execution Order:**
1.  Scaffold the folder structure and `package.json` files.
2.  Install dependencies.
3.  Create the `docker-compose.yml`.
4.  Write the `server/index.ts` code.
5.  Clean up the `client/app/page.tsx`.

**Action:** Please execute these steps now.