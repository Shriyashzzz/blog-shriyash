import type { Post } from "../../generated/prisma/client";
import { prisma } from "../config/prisma";

interface PostsResponse {
  ok: boolean;
  posts?: Post[];
}

class AdminQueries {
  async getPostsForAdmin(): Promise<PostsResponse> {
    try {
      const posts = await prisma.post.findMany({
        include: {
          _count: {
            select: {
              loves: true,
            },
          },
        },
      });
      return { ok: true, posts: posts };
    } catch (e) {
      return { ok: false };
    }
  }

  async createNewPost(
    title: string,
    content: string,
    published: boolean,
    userId: number,
  ) {
    try {
      const newPost = await prisma.post.create({
        data: {
          title: title,
          content: content,
          published: published,
          authorId: userId,
        },
      });
      return { ok: true, newPost: newPost };
    } catch (e: unknown) {
      console.log(e);
      return { ok: false };
    }
  }
}

const adminQueries = new AdminQueries();

export default adminQueries;
