# client-Admin

The CMS frontend for ** &lt; Shriyash Uncompiled /> &gt;** — where the admin writes, edits, publishes, and moderates content.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Install & Run](#install--run)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables-clientadminenv)
- [Connecting to the API](#connecting-to-the-api)

## Features

- WYSIWYG post editor (via MDXEditor) with a Markdown-backed content model
- Create, edit, publish/unpublish, and delete posts
- Custom underline support via a small MDXEditor plugin (Markdown doesn't support underline natively)
- Manage comments — delete any comment across posts
- View all posts, including unpublished drafts
- Admin-only login with JWT-based auth (via cookie, 2-day token lifetime)

## Tech Stack

- React
- Redux (state management)
- TypeScript
- React Router
- Tailwind CSS + Tailwind Typography
- Radix UI
- MDXEditor (WYSIWYG Markdown editing)
- react-markdown + remark-gfm + rehype-raw + rehype-sanitize + rehype-highlight (rendering saved content back for preview)

## Install & Run

```bash
cd client-Admin
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

## Environment Variables (`client-Admin/.env`)

```
VITE_SERVER_ADDRESS =
VITE_BLOG_SITE_ADDRESS =
```

Set this to the base URL of the server (e.g. `http://localhost:PORT/api`).

## Connecting to the API

This app talks to the `/api/admin/*` routes on the `server` backend documented in the root [server README](../server/README.md). Those routes require both a valid JWT and an `Admin` role. Make sure `CLIENT_ADMIN_URL` in the server's `.env` matches this app's dev URL so CORS and cookies work correctly.
