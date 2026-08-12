/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BLOG_SITE_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare module "*.svg";

export interface UserType {
  username: string;
  id: number;
  role: "Member" | "Admin";
}
