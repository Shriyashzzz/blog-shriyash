import { error } from "node:console";
import type { Post } from "../../generated/prisma/client";
import { prisma } from "../config/prisma";

interface PostsResponse {
  ok: boolean;
  posts?: Post[];
  error?: unknown;
}
interface UpdatePost {
  title?: string;
  content?: string;
  published?: boolean;
}

interface QueryResponse {
  ok: boolean;
  error?: unknown;
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
          comments: {
            select: {
              id: true,
              content: true,
              postedAt: true,
              authorId: true,
            },
          },
        },
      });
      return { ok: true, posts: posts };
    } catch (e) {
      return { ok: false, error: e };
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
      return { ok: false, error: e };
    }
  }

  async deleteComment(commentId: number) {
    try {
      const comment = await prisma.comment.delete({ where: { id: commentId } });
      return { ok: true };
    } catch (e) {
      console.log(e);
      return { ok: false };
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

      return { ok: true, post: post };
    } catch (e) {
      return { ok: false };
    }
  }

  async updatePost(
    updatePayload: UpdatePost,
    postId: number,
    authorId: number,
  ): Promise<QueryResponse> {
    try {
      if (updatePayload.content) {
        const postContent = await prisma.post.update({
          where: { id: postId, authorId: authorId },
          data: {
            content: updatePayload.content,
          },
        });
      }
      if (updatePayload.title) {
        const postTitle = await prisma.post.update({
          where: { id: postId, authorId: authorId },
          data: {
            title: updatePayload.title,
          },
        });
      }
      if (typeof updatePayload.published !== "undefined") {
        //checking against undefined becasue this is an boolean property
        const postPublished = await prisma.post.update({
          where: { id: postId, authorId: authorId },
          data: {
            published: updatePayload.published,
          },
        });
      }
      return { ok: true };
    } catch (e: unknown) {
      console.log(e);
      return { ok: false, error: e };
    }
  }

  async deletePost(postId: number, authorId: number) {
    try {
      const deletedPost = await prisma.post.delete({
        where: { id: postId, authorId: authorId },
      });
      return { ok: true, deletedPost: deletedPost };
    } catch (e) {
      console.log(e);
      return { ok: false, error: e };
    }
  }
}

const adminQueries = new AdminQueries();

export default adminQueries;
