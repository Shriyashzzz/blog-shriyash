# blog-shriyash

A full-stack blog application with a REST API backend (Node.js/Express/TypeScript/Prisma) and two frontends. One for readers (`client-User`) and one for admins (`client-Admin`).

## Tech Stack

- **Frontend** React, Redux, Typescript, Tailwind, React-Router, Radix-UI, Tailwind Typography
- **Backend:** Express 5, TypeScript, Prisma ORM, PostgreSQL, Supabase
- **Auth:** Passport (JWT strategy), JWT cookies, bcryptjs password hashing
- **Validation:** express-validator
- **Frontends:** `client-User` (public blog, interactive post management), `client-Admin` (admin side post/ user comments management)

## Acknowledgements

- **react-markdown** To Parse Markdown to HTML Elements
- **remark-gfm** Plugin used with react-markdown to parse autolink literals, footnotes, strikethrough, tables, tasklists
- **rehype-highlight** Plugin to apply syntax highlighting to code with lowlight.

## Project Structure

```
blog-shriyash/
├── client-Admin/
├── client-User/
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
- **PostCategory** Categories and post relation between Post & enum Category

## API Routes

Base URL: `/api`

All authenticated routes use `passport.authenticate("jwt")` and expect the JWT to be sent via the `auth_token` cookie set at login/signup.

### Public

| Method | Route   | Description                              |
| ------ | ------- | ---------------------------------------- |
| GET    | `/api/` | Get all published posts (home page feed) |

### Auth — `/api/auth`

| Method | Route              | Auth           | Description                                                                                            |
| ------ | ------------------ | -------------- | ------------------------------------------------------------------------------------------------------ |
| POST   | `/api/auth/signup` | No             | Register a new user. Body: `username, email, password, cpassword`                                      |
| POST   | `/api/auth/login`  | No             | Log in. Body: `email, password`. Sets `auth_token` cookie, returns user payload on successful response |
| DELETE | `/api/auth/logout` | Yes (JWT)      | Log out, clears `auth_token` cookie                                                                    |
| GET    | `/api/auth/me`     | Yes (JWT) / No | responds with 200 if valid jwt cookie sent with the request.                                           |

### Posts — `/api/post`

| Method | Route                    | Auth      | Description                                         |
| ------ | ------------------------ | --------- | --------------------------------------------------- |
| GET    | `/api/post/:postId`      | No        | Get a single published post by ID                   |
| POST   | `/api/post/:postId/love` | Yes (JWT) | Toggle love/unlove on a post for the logged-in user |

### Comments — `/api/comment`

| Method | Route                             | Auth      | Description                                                                                                  |
| ------ | --------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| POST   | `/api/comment/newComment/:postId` | Yes (JWT) | Add a comment to a post. Body: `commentContent`, returns all comments for the {postId} on success            |
| DELETE | `/api/comment/:commentId`         | Yes (JWT) | Delete a comment (only the comment's author can delete it), returns all comments for the {postId} on success |

### Search - `/api/search`

| Method | Route                            | Post                                                                                                                                                                                         | Description |
| ------ | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| GET    | `/api/search/posts/blogtitle/:q` | Searches blog posts by title. `:q` is a URL-encoded search string; returns all modified `Post[]` whose `title` contains a case-insensitive match for `q` (equivalent to a `LIKE %q%` match). |

### Admin — Posts — `/api/admin/posts`

All routes require JWT auth **and** an `Admin` role (`checkIfUserAdmin` middleware).

| Method | Route                              | Post                                                          | Description |
| ------ | ---------------------------------- | ------------------------------------------------------------- | ----------- |
| GET    | `/api/admin/posts/`                | Get all posts (published + unpublished)                       |
| GET    | `/api/admin/posts/getpost/:postId` | Get a single post (regardless of published status)            |
| POST   | `/api/admin/posts/newpost`         | Create a new post. Body: `title, content, published`          |
| PATCH  | `/api/admin/posts/update/:postId`  | Update a post's `title`, `content`, and/or `published` status |
| DELETE | `/api/admin/posts/delete/:postId`  | Delete the post/draft                                         |

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

### Design Choices

- Decided to use JWT instead of session-based auth (unlike my other project) to get hands-on experience with it. However, to ensure security, jwt is placed inside the cookie with (http: true, sameSite: "lax", & the expected algorithm is : ["HS256"], & secure to be true on PROD) to ensure cookies, are not exploited by bad users to steal data. This protects against XSS-based token theft while still preserving the horizontal scalability benefit JWTs offer over server-side sessions.

- Differentiated token lifetime between members 7d and admins 2d, members use their token to login & fast expiring tokens would not be very friendly. Likewise admins have greater privilege and more detrimental to being stolen, hence 2d for an admin, i.e me, i dont mind reentering my password every two days.

- Used react-markdown to render the markdown content, instead of setInnerHtml, since react-markdown makes my life much easier by sanitizing the input by default.

## Split Architecture

- I decided to build two separate frontends, one for consuming content, and one for the content management ui to post my blogs, CMS Frontend is still in progress, however, it'll be an simple WYSIWYG setup using Markdown.

- I know it can get very messy with an monorepo, which is why I took some time to ensure all my files are segregated nice and intuitively, For example, each sub-app has its own package.json, .env, and .gitignore, so if I ever wanted to split this into separate repos, the migration would be straightforward. Each part also runs in its own sandboxed environment, which keeps data and dependencies from leaking across apps.

- All the input from the client side is validated both in the ui side as well as on the server side, using express-validator, likewise anything that uploads to the database is going to be as parameterized queries to ensure no user input is seen as a code for my js to execute.

- I haven't built my CMS yet, but one challenge I am looking forward to will be handling data that are not strings, like images, gifs?. My gameplan is to basically use an s3 bucket to store those raw data and have a different model(TABLE) to store it's metadata / it's reference link to show it together with my Markdown content on the consuming frontend. I am not deadset, and I'll look for more resources on how people actually do it and implement with the best possible learned method.

That's it for now, I'll add more notes as the CMS comes together. Thanks for reading ;)

## License

ISC
