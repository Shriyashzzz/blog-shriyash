import { prisma } from "../config/prisma";
import { type Role } from "../../generated/prisma/enums";

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
