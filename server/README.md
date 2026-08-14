### Install & Run

```bash
cd server
npm install
npx prisma migrate dev
npm run dev      # starts the dev server (tsx watch)
```

### Folder Structure

````

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
### Environment Variables (`server/.env`)

````

DATABASE_URL=
PORT=
ENV=
DIRECT_URL=
JWT_SECRET=
CLIENT_USER_URL=
CLIENT_ADMIN_URL=

````

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
````

Typical error shape:

```json
{ "message": "Error description", "errors": [ ... ] }
```
