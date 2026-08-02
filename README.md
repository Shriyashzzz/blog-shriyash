# blog-shriyash

A full-stack blog application with a REST API backend (Node.js/Express/TypeScript/Prisma) and two frontends — one for readers (`client-User`) and one for admins (`client-Admin`).

## Tech Stack

- **Backend:** Express 5, TypeScript, Prisma ORM, PostgreSQL
- **Auth:** Passport (JWT strategy), JWT cookies, bcryptjs password hashing
- **Validation:** express-validator
- **Frontends:** `client-User` (public blog, interactive post management), `client-Admin` (adminm side post/ user comments management)

## Project Structure

```
blog-shriyash/
├── client-Admin/     # Admin frontend
├── client-User/      # User-facing frontend
└── server/           # Express API
    ├── prisma/        # Prisma schema & migrations
    └── src/
        ├── adminControllers/
        ├── adminRoutes/
        ├── controllers/
        ├── routes/
        ├── middlewares/
        ├── models/
        └── server.ts
```

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL database. (either local or on cloud)
- S3 bucket to save raw files (gifs, images), I'll be using one from supabase

### Environment Variables (`server/.env`)

```
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret
PORT=3000
CLIENT_URL=http://localhost:5173
ENV=DEV
```

### Install & Run

```bash
cd server
npm install
npx prisma migrate dev
npm run dev      # starts the dev server (tsx watch)
```

## Data Models (Prisma)

- **User** — `id, email, username, password, role (Member | Admin)`
- **Post** — `id, title, content, published, viewCount, createdAt, authorId`
- **Comment** — `id, postId, content, postedAt, authorId`
- **PostLove** — like/love relation between a `User` and a `Post`

## API Routes

Base URL: `/api`

All authenticated routes use `passport.authenticate("jwt")` and expect the JWT to be sent via the `auth_token` cookie set at login/signup.

### Public

| Method | Route   | Description                              |
| ------ | ------- | ---------------------------------------- |
| GET    | `/api/` | Get all published posts (home page feed) |

### Auth — `/api/auth`

| Method | Route              | Auth      | Description                                                       |
| ------ | ------------------ | --------- | ----------------------------------------------------------------- |
| POST   | `/api/auth/signup` | No        | Register a new user. Body: `username, email, password, cpassword` |
| POST   | `/api/auth/login`  | No        | Log in. Body: `email, password`. Sets `auth_token` cookie         |
| DELETE | `/api/auth/logout` | Yes (JWT) | Log out, clears `auth_token` cookie                               |

### Posts — `/api/post`

| Method | Route                    | Auth      | Description                                         |
| ------ | ------------------------ | --------- | --------------------------------------------------- |
| GET    | `/api/post/:postId`      | No        | Get a single published post by ID                   |
| POST   | `/api/post/:postId/love` | Yes (JWT) | Toggle love/unlove on a post for the logged-in user |

### Comments — `/api/comment`

| Method | Route                             | Auth      | Description                                                |
| ------ | --------------------------------- | --------- | ---------------------------------------------------------- |
| POST   | `/api/comment/newComment/:postId` | Yes (JWT) | Add a comment to a post. Body: `commentContent`            |
| DELETE | `/api/comment/:commentId`         | Yes (JWT) | Delete a comment (only the comment's author can delete it) |

### Admin — Posts — `/api/admin/posts`

All routes require JWT auth **and** an `Admin` role (`checkIfUserAdmin` middleware).

| Method | Route                              | Description                                                   |
| ------ | ---------------------------------- | ------------------------------------------------------------- |
| GET    | `/api/admin/posts/`                | Get all posts (published + unpublished)                       |
| GET    | `/api/admin/posts/getpost/:postId` | Get a single post (regardless of published status)            |
| POST   | `/api/admin/posts/newpost`         | Create a new post. Body: `title, content, published`          |
| PATCH  | `/api/admin/posts/update/:postId`  | Update a post's `title`, `content`, and/or `published` status |

### Admin — Comments — `api/admin/comment`

| Method | Route                          | Auth  | Description              |
| ------ | ------------------------------ | ----- | ------------------------ |
| DELETE | `api/admin/comment/:commentId` | Admin | Delete any comment by ID |

## Response Format

Responses to client are in JSON. Typical(most of them) success shape looks like this:

```json
{ "message": "Post Found", "post": { ... } }
```

Typical error shape:

```json
{ "message": "Error description", "errors": [ ... ] }
```

## License

ISC
