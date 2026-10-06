import type { Post } from "../generated/prisma/client.js";
import { prisma } from "../config/prisma.js";
import type { NewsLetter } from "../generated/prisma/client.js";
import { error } from "node:console";

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

export interface QueryResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: unknown;
}

export type TypeNewsLetter = {
  new_NewsLetter: NewsLetter;
};

class AdminQueries {
  async getPostsForAdmin(): Promise<PostsResponse> {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
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

  async createNewsLetter(
    subject: string,
    html: string,
    isDraft: boolean,
  ): Promise<QueryResponse<TypeNewsLetter>> {
    try {
      const newLetter: NewsLetter = await prisma.newsLetter.create({
        data: { subject: subject, html: html, draft: isDraft },
      });
      return { ok: true, data: { new_NewsLetter: newLetter } };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  }
  async getNewsLetter(
    id: number,
  ): Promise<QueryResponse<{ letter: NewsLetter }>> {
    try {
      const letter: NewsLetter = await prisma.newsLetter.findUniqueOrThrow({
        where: { id: id },
      });
      return { ok: true, data: { letter: letter } };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  }
  async updateNewsLetter(
    id: number,
    html: string,
    subject: string,
    isDraft: boolean,
  ): Promise<QueryResponse<{ letter: NewsLetter }>> {
    try {
      let updatedLetter;
      if (html) {
        updatedLetter = await prisma.newsLetter.update({
          where: { id: id },
          data: { html: html },
        });
      }
      if (subject) {
        updatedLetter = await prisma.newsLetter.update({
          where: { id: id },
          data: { subject: subject },
        });
      }
      if (isDraft) {
        updatedLetter = await prisma.newsLetter.update({
          where: { id: id },
          data: { draft: isDraft },
        });
      }

      if (updatedLetter) {
        return {
          ok: true,
          data: { letter: updatedLetter },
        };
      } else {
        return { ok: false };
      }
    } catch (e) {
      console.log(error);
      return { ok: false };
    }
  }

  async getSubscribers() {
    try {
      const data = await prisma.newsSubscribers.findMany({
        select: {
          email: true,
          userToken: true,
        },
      });
      return { ok: true, data: data };
    } catch (e) {
      console.log(e);
      return { ok: false };
    }
  }
  async getAllNewsLetter() {
    try {
      const data = await prisma.newsLetter.findMany({
        select: {
          id: true,
          subject: true,
          html: true,
          createdAt: true,
          draft: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return { ok: true, data: data };
    } catch (e) {
      console.log(e);
      return { ok: false };
    }
  }
}

const adminQueries = new AdminQueries();

export default adminQueries;
