import { prisma } from "../config/prisma";

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
}

const queries = new Queries();

export default queries;
