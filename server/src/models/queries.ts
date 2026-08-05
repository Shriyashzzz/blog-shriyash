import { prisma } from "../config/prisma";
import type { Comment } from "../../generated/prisma/client";
import { Prisma } from "../../generated/prisma/client";
interface CommentPost {
  ok: boolean;
  comments?: Array<Comment>;
}

interface PostLove {
  ok: boolean;
  loved?: boolean;
}
class Queries {
  async getPublishedPosts() {
    try {
      const getPosts = await prisma.post.findMany({
        where: {
          published: true,
        },
        include: {
          _count: {
            select: { loves: true },
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
          _count: {
            select: {
              loves: true,
            },
          },
          author: {
            select: { id: true, username: true, email: true, role: true }, // making sure password is not fetched
          },
          comments: {
            select: {
              id: true,
              postId: true,
              postedAt: true,
              content: true,
              author: {
                select: { id: true, username: true, email: true, role: true },
              },
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
      const post = await prisma.post.findUniqueOrThrow({
        where: { id: postid },
      });
      if (!post.published) return { ok: false };
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

  async lovePost(postId: number, authorId: number): Promise<PostLove> {
    try {
      const postLove = await prisma.postLove.create({
        data: {
          postId: postId,
          authorId: authorId,
        },
      });
      return { ok: true, loved: true };
    } catch (e: unknown) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code == "P2002"
      ) {
        try {
          const postLove = await prisma.postLove.delete({
            where: { postId_authorId: { postId, authorId } },
          });
          return { ok: true, loved: false };
        } catch (e) {
          console.log("Error deleting Love", e);
          return { ok: false };
        }
      }
      console.log("Error Loving this post", e);
      return { ok: false };
    }
  }

  async getComment(commentId: number) {
    try {
      const comment = await prisma.comment.findUniqueOrThrow({
        where: { id: commentId },
      });
      return { ok: true, comment: comment, autherId: comment.authorId };
    } catch (e: unknown) {
      return { ok: false, error: e };
    }
  }
  async deleteComment(commentId: number) {
    try {
      const comment = await prisma.comment.delete({ where: { id: commentId } });
      if (!comment) return { ok: false };
      return { ok: true, comment: comment };
    } catch (e: unknown) {
      return { ok: false, error: e };
    }
  }

  async getPostComments(postId: number): Promise<CommentPost> {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId: postId },
        include: {
          author: {
            select: { id: true, username: true, email: true, role: true }, // making sure password is not fetched
          },
        },
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
