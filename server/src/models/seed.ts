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
  //cleaar the database for seeding
  await prismaSeedClient.comment.deleteMany();
  await prismaSeedClient.post.deleteMany();
  await prismaSeedClient.user.deleteMany();

  // seed users

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
      email: " ",
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

  console.log(" Created 3 users");
  // 3. Create Posts with Markdown content
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

  // 4. Create Comments (also supports simple Markdown!)
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
