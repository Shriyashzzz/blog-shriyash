interface User {
  id: number;
  username: string;
  role: "Admin" | "Member";
}
interface Post {
  authorId: number;
  comments: Array<Comment>;
  content: string;
  createdAt: Date;
  id: string;
  published: boolean;
  title: string;
  viewCount: number;
  _count: { loves: number };
}

interface Comment {
  authorId: number;
  content: string;
  id: number;
  postedAt: Date;
}
