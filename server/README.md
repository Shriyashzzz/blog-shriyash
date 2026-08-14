# Server

This is the backend section of the app,all authentication, & crud operations with the database happens here.

## Table of Contents

- [Install & Run](#install--run)
- [⚠️ CORS (dev builds)](#️-cors-dev-builds)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables-serverenv)
- [Data Models](#data-models-prisma)
- [API Routes](#api-routes)
- [Response Format](#response-format)

## Install & Run

```bash
cd server
npm install
npx prisma migrate dev
npm run dev      # starts the dev server (tsx watch)
```

## ⚠️ CORS (dev builds)

> **CORS is enabled by default and will block cross-origin requests from your local frontends.** You need to disable/relax it for local development, or `client-User` and `client-Admin` won't be able to hit the API.

In `server.ts` (or wherever `cors()` is configured), make sure it allows your dev client URLs and credentials:

```ts
import cors from "cors";

app.use(
  cors({
    origin: [process.env.CLIENT_USER_URL!, process.env.CLIENT_ADMIN_URL!],
    credentials: true, // required — the JWT is sent via an httpOnly cookie
  }),
);
```

- Set `CLIENT_USER_URL` and `CLIENT_ADMIN_URL` in `server/.env` to match your local dev ports (e.g. `http://localhost:5173`, `http://localhost:5174`).
- `credentials: true` is required on **both** the server's `cors()` config and the frontend's fetch/axios calls (`credentials: "include"` / `withCredentials: true`), otherwise the `auth_token` cookie won't be sent or accepted.
- **Do not** ship a wide-open `origin: "*"` config to production — lock it down to your actual deployed client URLs before deploying.

## Folder Structure

```
└── server/
    ├── prisma/
    └── src/
        ├── adminControllers/
        ├── adminRoutes/
        ├── controllers/
        ├── routes/
        ├── middlewares/
        ├── models/
        └── server.ts
```

## Environment Variables (`server/.env`)

```
DATABASE_URL=
PORT=
ENV=
DIRECT_URL=
JWT_SECRET=
CLIENT_USER_URL=
CLIENT_ADMIN_URL=
```

## Data Models (Prisma)

| Model            | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| **User**         | `id, email, username, password, role (Member \| Admin)`         |
| **Post**         | `id, title, content, published, viewCount, createdAt, authorId` |
| **Comment**      | `id, postId, content, postedAt, authorId`                       |
| **PostLove**     | Like/love relation between a `User` and a `Post`                |
| **PostCategory** | Categories relation between `Post` and the `Category` enum      |

## API Routes

Base URL: `/api`

All authenticated routes use `passport.authenticate("jwt")` and expect the JWT to be sent via the `auth_token` cookie set at login/signup.

### Public

| Method | Route   | Auth | Description                              |
| ------ | ------- | ---- | ---------------------------------------- |
| GET    | `/api/` | No   | Get all published posts (home page feed) |

### Auth — `/api/auth`

| Method | Route              | Auth           | Description                                                                                |
| ------ | ------------------ | -------------- | ------------------------------------------------------------------------------------------ |
| POST   | `/api/auth/signup` | No             | Register a new user. Body: `username, email, password, cpassword`                          |
| POST   | `/api/auth/login`  | No             | Log in. Body: `email, password`. Sets `auth_token` cookie, returns user payload on success |
| DELETE | `/api/auth/logout` | Yes (JWT)      | Log out, clears `auth_token` cookie                                                        |
| GET    | `/api/auth/me`     | Optional (JWT) | Responds with 200 if a valid JWT cookie is sent with the request                           |

### Posts — `/api/post`

| Method | Route                    | Auth      | Description                                         |
| ------ | ------------------------ | --------- | --------------------------------------------------- |
| GET    | `/api/post/:postId`      | No        | Get a single published post by ID                   |
| POST   | `/api/post/:postId/love` | Yes (JWT) | Toggle love/unlove on a post for the logged-in user |

### Comments — `/api/comment`

| Method | Route                             | Auth      | Description                                                                                    |
| ------ | --------------------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| POST   | `/api/comment/newComment/:postId` | Yes (JWT) | Add a comment to a post. Body: `commentContent`. Returns all comments for `:postId` on success |
| DELETE | `/api/comment/:commentId`         | Yes (JWT) | Delete a comment (author only). Returns all comments for the post on success                   |

### Search — `/api/search`

| Method | Route                            | Auth | Description                                                                                                                                                              |
| ------ | -------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | `/api/search/posts/blogtitle/:q` | No   | Search blog posts by title. `:q` is a URL-encoded search string; returns all `Post[]` whose `title` contains a case-insensitive match for `q` (equivalent to `LIKE %q%`) |

### Admin — Posts — `/api/admin/posts`

All routes require JWT auth **and** an `Admin` role (`checkIfUserAdmin` middleware).

| Method | Route                              | Description                                                   |
| ------ | ---------------------------------- | ------------------------------------------------------------- |
| GET    | `/api/admin/posts/`                | Get all posts (published + unpublished)                       |
| GET    | `/api/admin/posts/getpost/:postId` | Get a single post (regardless of published status)            |
| POST   | `/api/admin/posts/newpost`         | Create a new post. Body: `title, content, published`          |
| PATCH  | `/api/admin/posts/update/:postId`  | Update a post's `title`, `content`, and/or `published` status |
| DELETE | `/api/admin/posts/delete/:postId`  | Delete the post/draft                                         |

### Admin — Comments — `/api/admin/comment`

| Method | Route                           | Auth  | Description              |
| ------ | ------------------------------- | ----- | ------------------------ |
| DELETE | `/api/admin/comment/:commentId` | Admin | Delete any comment by ID |

## Response Format

Responses to the client are in JSON.

**Typical success shape:**

```json
{ "message": "Post Found", "post": { ... } }
```

**Typical error shape:**

```json
{ "message": "Error description", "errors": [ ... ] }
```
