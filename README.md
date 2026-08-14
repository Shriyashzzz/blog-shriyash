# blog-shriyash

Personal full-stack blog webapp with a REST API backend (Node.js/Express/TypeScript/Prisma) and two frontends. One for readers (`client-User`) and one CMS for admins (`client-Admin`).

## Tech Stack

- **Frontend** React, Redux, Typescript, Tailwind, React-Router, Radix-UI, Tailwind Typography
- **Backend:** Express 5, TypeScript, Prisma ORM, PostgreSQL, Supabase
- **Auth:** Passport (JWT strategy), JWT cookies, bcryptjs password hashing
- **Validation:** express-validator
- **Frontends:** `client-User` (public blog, interactive post management), `client-Admin` (admin side post/ user comments management)

## Acknowledgements

- **react-markdown** To Parse Markdown to HTML Elements
- **remark-gfm** Plugin used with react-markdown to parse autolink literals, footnotes, strikethrough, tables, tasklists
- **rehype-raw** To parse string to html
- **rehype-sanitize** To Sanitize raw html
- **rehype-highlight** Plugin to apply syntax highlighting to code with lowlight.
- **mdxEditor** To convert normal strings into markdown for WYSIWYG Text Editor
- **Tailwind-Typography** Disables preflight and impelemnts style for typography design for readable styles.

## Project Structure

```
blog-shriyash/
├── client-Admin/
├── client-User/
└── server/
```

## Getting Started

```
npm run dev
```

runs all three decoupled application from the root folder 'blog-shriyash'

### Prerequisites

- Node.js
- PostgreSQL database. (either local or on cloud)

### Design Choices

- Decided to use JWT instead of session-based auth (unlike my other project) to get hands-on experience with it. However, to ensure security, jwt is placed inside the cookie with (http: true, sameSite: "lax", & the expected algorithm is : ["HS256"], & secure to be true on PROD) to ensure cookies, are not exploited by bad users to steal data. This protects against XSS-based token theft while still preserving the horizontal scalability benefit JWTs offer over server-side sessions.

- Differentiated token lifetime between members 7d and admins 2d, members use their token to login & fast expiring tokens would not be very friendly. Likewise admins have greater privilege and more detrimental to being stolen, hence 2d for an admin, i.e me, i dont mind reentering my password every two days.

- Used react-markdown to render the markdown content, instead of setInnerHtml, since react-markdown makes my life much easier by sanitizing the input by default.

## Split Architecture

- I decided to build two separate frontends, one for consuming content, and one for the content management ui to post my blogs, CMS Frontend is still in progress, however, it'll be an simple WYSIWYG setup using Markdown.

- I know it can get very messy with an monorepo, which is why I took some time to ensure all my files are segregated nice and intuitively, For example, each sub-app has its own package.json, .env, and .gitignore, so if I ever wanted to split this into separate repos, the migration would be straightforward. Each part also runs in its own sandboxed environment, which keeps data and dependencies from leaking across apps.

- All the input from the client side is validated both in the ui side as well as on the server side, using express-validator, likewise anything that uploads to the database is going to be as parameterized queries to ensure no user input is seen as a code for my js to execute.

- My CMS is pretty simple with a lot of components taken from my user front-end, something that was pretty challenging and fun to figure out was to figure out how to implement a WYSIWYG Text editor, I decided to use MdxEDitor library, I think that was a fantastic ibarary with bunch of customization available, you need a toolbar?, it's just a plugin away, you want undo redo button? same. Very simple to implement, however, one issue I did run into was with underline, if you don't know markdown, does not support underline, and since I did want to implement that on my app, i had to basically write a plugin to insert html `<u> </u> `, and get the post content from the database, parse the markdown to string, string to html, sanitize the html and apply the style.

- I learned so much, I have so much more to say, I'll see you on _&lt;Shriyash Uncompiled / &gt;_ for detailed deep dive into this.

## License

ISC
