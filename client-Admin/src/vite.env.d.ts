declare module "*.svg";

export interface UserType {
  username: string;
  id: number;
  role: "Member" | "Admin";
}
