import type { Role } from "../../generated/prisma/enums.js";

declare global {
  namespace Express {
    interface User {
      username: string;
      id: number;
      role: Role;
    }
  }
}
