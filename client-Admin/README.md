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
- Markdown Shortcuts to edit your post
- Create, edit, publish/unpublish, and delete posts
- Custom underline support via a small MDXEditor plugin (Markdown doesn't support underline natively)
- Manage comments — delete any comment across posts
- View all posts, including unpublished drafts
- Admin-only login with JWT-based auth (via cookie, 2-day token lifetime)

## Shortcuts

- Use one to six # characters to create a heading. The number of # characters determines the heading level.
- Use \* or - to create a list item.
- Use > to create a block quote.
- Select a text and press Ctrl+B to make it bold, Ctrl+I to make it italic, or Ctrl+U to underline it. Use Cmd on macOS.
- With text selected, use Cmd+K to open the link dialog.
- Use ` to create inline code.
- Type ```$lang (with $lang being any supported language, followed by space) to insert a code block.

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

## Acknowledgement

> I think it'd be very unfair if I didn't credit petyosi, creater of [mdxEditor]("https://github.com/mdx-editor/editor") and it's of team of contributers, mdxEditor has been a veryeasy markdown editor library to work with, there is a bunch of plugins for all sorts of things, for toolbars, images, links, and even shortcuts. So if you are more familier with raw markdown, you can use raw markdown to write blogs.

- tailwindtTypography
- radix-ui
