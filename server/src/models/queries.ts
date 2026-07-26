import { prisma } from "../config/prisma";
import { type Role } from "../../generated/prisma/enums";
import type { Post } from "../../generated/prisma/client";

interface QueryPost {
  found: boolean;
  published?: boolean;
  post?: Post;
}

class Queries {
  async getPublishedPosts() {
    try {
      const getPosts = await prisma.post.findMany({
        where: {
          published: true,
        },
      });
      return getPosts;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async getPost(postId: number) {
    try {
      const post = await prisma.post.findUniqueOrThrow({
        where: { id: postId },
        include: {
          authorId: false,
          author: {
            select: { id: false, username: true, email: true }, // making sure password is not fetched
          },
          comments: {
            select: {
              id: true,
              postId: false,
              postedAt: true,
              content: true,
              author: { select: { id: true, username: true, email: true } },
            },
          },
        },
      });
      if (post.published) {
        await prisma.post.update({
          where: { id: postId },
          data: { viewCount: { increment: 1 } },
        });
        return { found: true, published: true, post: post };
      }
      return { found: true, published: false };
    } catch (e) {
      return { found: false };
    }
  }
}

const queries = new Queries();

export default queries;
