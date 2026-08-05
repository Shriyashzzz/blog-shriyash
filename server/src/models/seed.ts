import { Category, Role } from "../../generated/prisma/enums";
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
      title: "A Comprehensive Guide to Modern PostgreSQL Indexing Strategies",
      content: `## Introduction to Database Indexing

Database performance often boils down to how fast you can access your data. As applications scale from thousands to millions of rows, unstructured table scans become the primary bottleneck in query execution latency. Without properly constructed indexes, PostgreSQL must perform sequential table scans—reading every single page on the disk to evaluate a simple \`WHERE\` condition.

Indexes act as specialized pointer structures (most commonly balanced trees) that map column values directly to physical tuples on disk, drastically minimizing total I/O ops.

---

## Exploring Core PostgreSQL Index Types

PostgreSQL provides several indexing algorithms, each optimized for specific data structures and query workloads. Choosing the wrong index type can lead to unnecessary storage overhead and degraded write performance without yielding read speed improvements.

### 1. B-Tree Indexes
The default index strategy in PostgreSQL. B-Tree indexes handle equality (\`=\`) and range queries (\`<\`, \`<=\`, \`>\`, \`>=\`).

\`\`\`sql
CREATE INDEX idx_users_email ON "User"("email");
\`\`\`

### 2. GIN (Generalized Inverted Index)
GIN indexes are designed for composite types where a single column contains multiple elements—such as \`JSONB\` objects, arrays, or full-text search documents.

\`\`\`sql
-- Indexing JSONB data fields
CREATE INDEX idx_orders_metadata ON "Order" USING GIN (metadata);
\`\`\`

### 3. BRIN (Block Range Index)
BRIN indexes store summaries about ranges of physically adjacent table blocks. They are ideal for massive, naturally ordered datasets such as append-only time-series logs.

\`\`\`sql
-- High-efficiency index for time-series logs
CREATE INDEX idx_audit_created_at ON "AuditLog" USING BRIN (created_at);
\`\`\`

---

## Indexing Best Practices & Anti-Patterns

While indexes accelerate \`SELECT\` statements, they come with trade-offs. Every \`INSERT\`, \`UPDATE\`, and \`DELETE\` operation requires updating the corresponding index entries.

* **Avoid Indexing Low-Cardinality Columns:** Creating a B-Tree index on boolean flags or gender fields provides almost zero performance benefit because PostgreSQL's query planner will prefer sequential scans.
* **Partial Indexes:** Limit index size by targeting specific conditional subsets of your table.
  \`\`\`sql
  CREATE INDEX idx_active_users ON "User"(email) WHERE is_active = true;
  \`\`\`
* **Composite Index Ordering:** When creating multi-column indexes, place the most selective equality column first, followed by range condition columns.

> **Pro Tip:** Monitor index usage regularly using \`pg_stat_user_indexes\` to locate unused indexes that consume memory and slow down write throughput.`,
      published: true,
      viewCount: 310,
      authorId: admin.id,
    },
  });

  const post2 = await prismaSeedClient.post.create({
    data: {
      title: "Architecting Production-Ready React Dashboards with Tailwind CSS",
      content: `## The Modern Frontend Stack

Building scalable admin panels and enterprise dashboards requires a strict separation of design tokens, layout primitives, and interactive state management. Utility-first CSS via **Tailwind CSS** enables development teams to rapidly assemble responsive components while maintaining strict UI consistency across an entire engineering organization.

---

## Setting Up the Build Architecture

To integrate Tailwind CSS into a modern Vite or Next.js React codebase, follow standard configuration steps:

### Installation & Initialization
\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### Template Configuration
Ensure your template paths explicitly include all UI components so Tailwind's JIT (Just-In-Time) compiler can purge unused styles in production:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0284c7',
          900: '#0c4a6e',
        }
      }
    },
  },
  plugins: [],
}
\`\`\`

---

## Building a Responsive Dashboard Layout

When constructing multi-pane dashboards, use CSS Grid for page framing and Flexbox for component alignment.

\`\`\`tsx
import React from 'react';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 shrink-0">
        <h2 className="text-xl font-bold tracking-tight mb-8">DevAdmin</h2>
        <nav className="space-y-2">
          <a href="#" className="block px-4 py-2.5 rounded-lg bg-slate-800 text-sky-400 font-medium">Overview</a>
          <a href="#" className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 text-slate-300 font-medium transition">Analytics</a>
          <a href="#" className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 text-slate-300 font-medium transition">Settings</a>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">System Analytics</h1>
        </header>
        {children}
      </main>
    </div>
  );
};
\`\`\`

Check out the official documentation on [TailwindCSS Docs](https://tailwindcss.com) for advanced micro-animations and theme customization guides.`,
      published: true,
      viewCount: 95,
      authorId: admin.id,
    },
  });

  const post3 = await prismaSeedClient.post.create({
    data: {
      title:
        "Mastering Advanced TypeScript: Generics, Type Guards, and Conditional Types",
      content: `## Deep Dive into Advanced TypeScript Fundamentals

Static type systems prevent runtime errors, document codebases implicitly, and supercharge IDE auto-completion. However, moving beyond simple type primitives to construct scalable library APIs requires a firm grasp of **Generics**, **Type Guards**, and **Type Assertions**.

---

## Leveraging Generic Functions & Interfaces

Generics allow functions, interfaces, and classes to capture type information at execution time, enabling reusable logic without resorting to unsafe \`any\` casts.

### Generic Network Client Abstraction

\`\`\`typescript
interface ApiResponse<TData> {
  data: TData;
  status: number;
  message?: string;
  timestamp: string;
}

async function fetchApi<TData>(endpoint: string): Promise<ApiResponse<TData>> {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(\`Network error HTTP: \${response.status}\`);
  }
  const data: TData = await response.json();
  
  return {
    data,
    status: response.status,
    timestamp: new Date().toISOString()
  };
}
\`\`\`

---

## Runtime Safety via User-Defined Type Guards

TypeScript's type system exists exclusively at compile time. When interacting with untrusted external payloads (such as API responses), user-defined type guards using the \`is\` predicate validate object structures at runtime while casting types safely.

\`\`\`typescript
interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
}

// User-defined type guard
function isUserProfile(payload: unknown): payload is UserProfile {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'id' in payload &&
    'email' in payload &&
    'role' in payload &&
    ['admin', 'member', 'guest'].includes((payload as UserProfile).role)
  );
}

// Usage Example
async function loadUser(id: string) {
  const rawData = await fetchApi<unknown>(\`/api/users/\${id}\`);
  
  if (isUserProfile(rawData.data)) {
    // TypeScript safely narrows rawData.data to UserProfile inside this block
    console.log(\`Logged in as: \${rawData.data.email.toLowerCase()}\`);
  } else {
    console.error("Received malformed UserProfile structure");
  }
}
\`\`\`

### Key Benefits Checklist
* [x] **Compile-Time Verification:** Catches API integration bugs during code compilation.
* [x] **Zero Memory Overhead:** Types are stripped out entirely during build compilation.
* [x] **Enhanced Developer Experience:** Unlocks precise context-aware IDE autocompletion.`,
      published: true,
      viewCount: 520,
      authorId: admin.id,
    },
  });

  const post4 = await prismaSeedClient.post.create({
    data: {
      title: "Comprehensive HTTP Status Code & REST API Architecture Reference",
      content: `## The Core Role of HTTP Status Codes

When architecting RESTful APIs, conveying accurate operation outcomes to client callers relies on adherence to the HTTP/1.1 and HTTP/2 specification standards. Misusing HTTP status codes—such as returning a \`200 OK\` containing an error payload—breaks client-side caching mechanisms, obfuscates system monitoring metrics, and complicates error handling logic.

---

## Master HTTP Status Code Breakdown

| Category | Range | Purpose & Semantics | Common Real-World Examples |
| :--- | :--- | :--- | :--- |
| **Informational** | 100–199 | Request received; process continuing | \`100 Continue\`, \`101 Switching Protocols\` |
| **Success** | 200–299 | Action successfully received & processed | \`200 OK\`, \`201 Created\`, \`204 No Content\` |
| **Redirection** | 300–399 | Client must perform further action | \`301 Moved Permanently\`, \`304 Not Modified\` |
| **Client Error** | 400–499 | Malformed syntax, invalid auth, or missing resource | \`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\` |
| **Server Error** | 500–599 | Server failed to fulfill a valid request | \`500 Internal Error\`, \`502 Bad Gateway\`, \`503 Service Unavailable\` |

---

## Best Practices for REST API Responses

1. **201 Created:** Always include a \`Location\` header containing the URI of the newly generated resource when returning a \`201\` status code.
2. **204 No Content:** Use this for successful \`DELETE\` or \`PUT\` requests when no response body payload needs to be returned to the caller.
3. **Structured Error Payloads:** Pair \`4xx\` and \`5xx\` responses with standardized error objects following RFC 7807 (Problem Details for HTTP APIs).

\`\`\`json
{
  "type": "https://api.example.com/errors/invalid-payload",
  "title": "Invalid Payload Parameters",
  "status": 400,
  "detail": "The 'email' field must be a valid email string address.",
  "instance": "/api/v1/users/signup"
}
\`\`\`

> **Architectural Golden Rule:** Never return a \`200 OK\` HTTP response code with an internal body error message like \`{ "success": false, "error": "Unauthorized" }\`. Use standard \`401 Unauthorized\` or \`403 Forbidden\` statuses instead!`,
      published: true,
      viewCount: 840,
      authorId: admin.id,
    },
  });

  const post5 = await prismaSeedClient.post.create({
    data: {
      title:
        "Deploying Enterprise Node.js Microservices using Multi-Stage Docker Builds",
      content: `## Containerizing Production Applications

Docker containerization standardizes Node.js runtime environments across local development setups, staging servers, and production Kubernetes clusters. However, naive Docker images often bundle unnecessary dev dependencies, build tools, and local source files—leading to massive image footprints, slow deployment build steps, and elevated security risks.

---

## Optimized Multi-Stage Dockerfile Execution

Multi-stage builds allow developers to execute compilation and testing within temporary intermediate containers, copying *only* essential production assets into the final runtime container layer.

\`\`\`dockerfile
# Stage 1: Build & Compilation Environment
FROM node:20-alpine AS builder
WORKDIR /app

# Cache package installation layers
COPY package*.json ./
RUN npm ci

# Copy source code and perform build
COPY . .
RUN npm run build

# Prune development dependencies to isolate production packages
RUN npm prune --production

# Stage 2: Lean Production Runtime Environment
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment flag
ENV NODE_ENV=production

# Security: Run as non-root system user
USER node

# Selectively copy built artifacts and pruned dependencies
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

---

## Production Security & Deployment Checklist

* **Ignore Local Artifacts:** Ensure your root directory includes a comprehensive \`.dockerignore\` file containing \`node_modules\`, \`dist\`, \`.git\`, and local environment variable files (\`.env\`).
* **Non-Root Execution:** Explicitly execute containers under low-privilege system accounts (e.g., \`USER node\`) to prevent root escalation vulnerabilities inside the host OS kernel.
* **Secret Management:** Never pass production API keys, database connection strings, or JWT secrets directly into a Dockerfile via \`ENV\`. Supply secrets at runtime using container orchestration secret managers or environment files (\`--env-file\`).`,
      published: true,
      viewCount: 412,
      authorId: admin.id,
    },
  });

  const post6 = await prismaSeedClient.post.create({
    data: {
      title: "Understanding Layout Engine Mechanics: CSS Grid vs Flexbox",
      content: `## Choosing the Correct Layout Strategy

Web developers frequently debate whether **CSS Grid** or **Flexbox** provides better responsive design capabilities. Understanding the core rendering mechanics behind both specs reveals that they are built to solve distinct architectural layout challenges rather than compete directly.

---

## Core Operational Differences

* **Flexbox (One-Dimensional Layouts):** Flexbox controls content distribution strictly across a single axis at a time—either a row *or* a column. It is inherently **content-driven**, meaning items adjust their dimensions dynamically based on their intrinsic content size.
* **CSS Grid (Two-Dimensional Layouts):** CSS Grid manages rows *and* columns simultaneously within a unified parent grid container. It is inherently **layout-driven**, meaning content items adapt to fit strict grid areas defined by the container parent.

> **Rule of Thumb:** Use Flexbox for isolated UI components (navbars, button groups, breadcrumbs); use CSS Grid for page framing, image galleries, and structured dashboard card views.

---

## Real-World Implementation Examples

### 1. Responsive CSS Grid Dashboard Layout
Construct a auto-responsive card grid without writing explicit media queries:

\`\`\`css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\`

### 2. Flexible Flexbox Header Navigation
Align navigation elements cleanly along a horizontal single-axis row:

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
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
