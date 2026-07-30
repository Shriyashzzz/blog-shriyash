import { error } from "node:console";
import { Prisma, type User } from "../../generated/prisma/client";
import { prisma } from "../config/prisma";

interface newUser {
  success: Boolean;
  user?: User;
  message: string;
  errorCode?: string;
}

class AuthQueries {
  async signUpNewUser(
    email: string,
    password: string,
    username: string,
  ): Promise<newUser> {
    try {
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: password,
          email: email,
        },
      });
      if (newUser) {
        return {
          success: true,
          user: newUser,
          message: "Successfully created a new user",
        };
      }
      return {
        success: false,
        message: "Error making a new user",
      };
    } catch (e: unknown) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          success: false,
          message: "Error creating a new user, check error log",
          errorCode: e.code,
        };
      }
      console.error(e);
      return {
        success: false,
        message: "Error creating a new user, check error log",
      };
    }
  }
}

const authQueries = new AuthQueries();

export default authQueries;
