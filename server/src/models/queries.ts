import { prisma } from "../config/prisma";
import { type Role } from "../../generated/prisma/enums";
import type { Comment } from "../../generated/prisma/client";

interface CommentPost {
  ok: boolean;
  comments?: Array<Comment>;
}

class Queries {
  async getPublishedPosts() {
    try {
      const getPosts = await prisma.post.findMany({
        where: {
          published: true,
        },
        include: {
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

  async addnewComment(
    postid: number,
    commentContent: string,
    authorId: number,
  ): Promise<CommentPost> {
    try {
      const comment = await prisma.comment.create({
        data: { postId: postid, content: commentContent, authorId: authorId },
      });
      if (comment) return { ok: true };
      return { ok: false };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  }

  async getPostComments(postId: number): Promise<CommentPost> {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId: postId },
      });
      return { ok: true, comments: comments };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  }
}

const queries = new Queries();

export default queries;
