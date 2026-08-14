# client-User

The public-facing frontend for ** &lt; Shriyash Uncompiled /> &gt;**.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Install & Run](#install--run)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables-clientuserenv)
- [Connecting to the API](#connecting-to-the-api)

## Features

- Home feed of published posts
- Full post view with Markdown rendering (headings, tables, code blocks with syntax highlighting, etc.)
- Comment on posts (sign-in required)
- Love/unlove posts (sign-in required)
- Search posts by title
- Signup / login / logout with JWT-based auth (via cookie)

## Tech Stack

- React
- Redux (state management)
- TypeScript
- React Router
- Tailwind CSS + Tailwind Typography
- Radix UI
- react-markdown + remark-gfm + rehype-raw + rehype-sanitize + rehype-highlight (safe Markdown rendering with syntax highlighting)

## Install & Run

```bash
cd client-User
npm install
npm run dev
```

## Folder Structure

```
client-User/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── assets/
│   └── main.tsx
│   └── router.tsx
└── .env
```

## Environment Variables (`client-User/.env`)

```
VITE_API_URL=

```

Set this to the base URL of the server (e.g. `http://localhost:PORT/api`).

## Connecting to the API

This app talks to the `server` backend documented in the root [server README](../server/README.md). Authenticated requests rely on the `auth_token` cookie set at login/signup — make sure `CLIENT_USER_URL` in the server's `.env` matches this app's dev URL so CORS and cookies work correctly.
