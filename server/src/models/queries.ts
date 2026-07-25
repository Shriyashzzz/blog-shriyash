import { prisma } from "../config/prisma";
import { type Role } from "../../generated/prisma/enums";
import { type User } from "../../generated/prisma/client";
interface JwtPayLoad {
  id: number;
  username: string;
  role: Role;
}

type UserDetailWithoutPassword = Omit<User, "password">;

interface ReturnValidPayload {
  isValid: Boolean;
  user?: UserDetailWithoutPassword;
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
  async verifyTokenPayload(payload: JwtPayLoad): Promise<ReturnValidPayload> {
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
        role: payload.role,
        username: payload.username,
      },
    });
    if (!user) return { isValid: false };
    const { password, ...userData } = user;
    return { isValid: true, user: userData };
  }
}

const queries = new Queries();

export default queries;
