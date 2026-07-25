import type { Role } from "../../generated/prisma/enums";

declare global {
  namespace Express {
    interface User {
      username: string;
      id: number;
      role: Role;
    }
  }
}
