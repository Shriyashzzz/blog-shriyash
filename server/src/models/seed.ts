import { Role } from "../../generated/prisma/enums";
import { PrismaClient } from "../../generated/prisma/client";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString, max: 1 });
const adapter = new PrismaPg(pool);
const prismaSeedClient = new PrismaClient({ adapter });

async function main() {
  // Clear the database for seeding
  await prismaSeedClient.comment.deleteMany();
  await prismaSeedClient.post.deleteMany();
  await prismaSeedClient.user.deleteMany();

  // 1. Seed Users (All posts remain authored exclusively by Admin)
  const admin = await prismaSeedClient.user.create({
    data: {
      email: "ghimireshriyash@gmail.com",
      username: "Shriyash Ghimire",
      role: Role.Admin,
      password: await bcrypt.hash("12345", 12),
    },
  });

  const member1 = await prismaSeedClient.user.create({
    data: {
      email: "sarah.chen@dev.io",
      username: "Sarah Chen",
      role: Role.Member,
      password: await bcrypt.hash("12345", 12),
    },
  });

  const member2 = await prismaSeedClient.user.create({
    data: {
      email: "marcus.v@builder.dev",
      username: "Marcus Vance",
      role: Role.Member,
      password: await bcrypt.hash("12345", 12),
    },
  });

  console.log("Created 3 users");

  // 2. Create Posts (Authored strictly by Admin)
  const post1 = await prismaSeedClient.post.create({
    data: {
      title: "A Guide to Modern PostgreSQL Indexing",
      content: `## Why Indexing Matters

Database performance often boils down to how fast you can scan tables. Without indexes, PostgreSQL has to execute full sequential scans.

### Common Index Types:
* **B-Tree**: The default index for general equality and range queries.
* **GIN (Generalized Inverted Index)**: Best for composite types like \`JSONB\` or arrays.
* **BRIN**: Ideal for massive sequential data like timestamp logs.

### Example Query
\`\`\`sql
CREATE INDEX idx_users_email ON "User"("email");
\`\`\`

> **Note:** Over-indexing can slow down write operations (\`INSERT\`/\`UPDATE\`), so choose carefully!`,
      published: true,
      viewCount: 310,
      authorId: admin.id,
    },
  });

  const post2 = await prismaSeedClient.post.create({
    data: {
      title: "Building React Dashboards with Tailwind CSS",
      content: `### Getting Started

Building responsive user interfaces is fast and predictable when using utility-first CSS.

#### Essential Setup Steps:
1. Install dependencies: \`npm install -D tailwindcss postcss autoprefixer\`
2. Initialize config: \`npx tailwindcss init -p\`
3. Configure template paths in \`tailwind.config.js\`.

Check out the official documentation on [TailwindCSS Docs](https://tailwindcss.com) for more tips!`,
      published: true,
      viewCount: 95,
      authorId: admin.id,
    },
  });

  const post3 = await prismaSeedClient.post.create({
    data: {
      title: "Mastering TypeScript Generics and Type Guards",
      content: `## Beyond Basic Types

TypeScript generics allow you to write flexible, reusable components without sacrificing type safety.

### Generic Functions
Here is a typed wrapper for standard API requests:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();
  return { data, status: response.status };
}
\`\`\`

### Type Guards in Action
Use the \`is\` keyword to narrow down types safely at runtime:

\`\`\`typescript
interface User { name: string; role: 'admin' | 'user' }

function isAdmin(user: any): user is User {
  return typeof user === 'object' && user !== null && user.role === 'admin';
}
\`\`\`

#### Benefits Checklist
* [x] Catches bugs at compile time
* [x] Eliminates unnecessary type casting (\`as string\`)
* [x] Improves IDE auto-completion`,
      published: true,
      viewCount: 520,
      authorId: admin.id,
    },
  });

  const post4 = await prismaSeedClient.post.create({
    data: {
      title: "Comprehensive HTTP Status Code Reference",
      content: `## Quick Reference Table

When designing REST APIs, using the correct status code ensures client applications can handle responses predictably.

| Category | Range | Purpose | Common Examples |
| :--- | :--- | :--- | :--- |
| **Informational** | 100–199 | Request received, continuing | \`100 Continue\` |
| **Success** | 200–299 | Action successfully received | \`200 OK\`, \`201 Created\`, \`204 No Content\` |
| **Redirection** | 300–399 | Further action needed | \`301 Moved Permanently\`, \`304 Not Modified\` |
| **Client Error** | 400–499 | Bad request payload or auth issue | \`400 Bad Request\`, \`401 Unauthorized\`, \`404 Not Found\` |
| **Server Error** | 500–599 | Server failed to fulfill request | \`500 Internal Server Error\`, \`503 Unavailable\` |

> **Pro Tip:** Avoid returning \`200 OK\` with an error payload like \`{ success: false }\`. Stick to standard HTTP standards!`,
      published: true,
      viewCount: 840,
      authorId: admin.id,
    },
  });

  const post5 = await prismaSeedClient.post.create({
    data: {
      title: "Deploying Node.js Microservices with Docker",
      content: `## Containerizing Applications

Docker guarantees that your application runs identically in development and production environments.

### Multi-Stage Dockerfile
Use multi-stage builds to keep production images tiny and secure:

\`\`\`dockerfile
# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

### Environment Setup
1. Create a \`.env\` file in your root folder.
2. Ensure secrets are **never** committed to version control.
3. Run container: \`docker run -p 3000:3000 --env-file .env my-node-app\``,
      published: true,
      viewCount: 412,
      authorId: admin.id,
    },
  });

  const post6 = await prismaSeedClient.post.create({
    data: {
      title: "Understanding CSS Grid vs Flexbox",
      content: `## Layout Mechanics

Choosing between **Flexbox** and **CSS Grid** often comes down to dimensions.

* **Flexbox** is designed for one-dimensional layouts (a row *or* a column).
* **CSS Grid** is designed for two-dimensional layouts (rows *and* columns simultaneously).

> "Flexbox is content-first; Grid is layout-first."

### Example Grid Layout

\`\`\`css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
\`\`\``,
      published: true,
      viewCount: 180,
      authorId: admin.id,
    },
  });

  console.log("Created 6 posts");

  // 3. Seed Comments
  await prismaSeedClient.comment.createMany({
    data: [
      {
        content:
          "Great overview on **GIN** vs **B-Tree**! Would love a follow-up on partitioning.",
        postId: post1.id,
        authorId: member1.id,
      },
      {
        content:
          "Thanks! Adding a note about table partitioning for next week’s post.",
        postId: post1.id,
        authorId: admin.id,
      },
      {
        content:
          "The Docker multi-stage build example saved my deployment pipelines today. Thanks!",
        postId: post5.id,
        authorId: member2.id,
      },
      {
        content: "Super useful HTTP table. Bookmarking this for quick access!",
        postId: post4.id,
        authorId: member1.id,
      },
    ],
  });

  console.log("Seeding complete");
}

main()
  .then(async () => {
    await prismaSeedClient.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaSeedClient.$disconnect();
    await pool.end();
    process.exit(1);
  });
