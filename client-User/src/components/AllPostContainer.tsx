import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

interface Post {
  authorId: number;
  content: string;
  createdAt: Date;
  id: number;
  title: string;
  viewCount: number;
  _count: { loves: number };
}

interface PostsResponse {
  posts: Post[];
}

export function AllPostContainer() {
  const [posts, setPosts] = useState<Post[]>([]);

  const { data, loading, error } = useFetch<PostsResponse>("/api/");
  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);
  if (error) {
    return <>Error Occurred</>;
  }
  if (loading || posts.length == 0) {
    return <>Loading</>;
  }

  return <section></section>;
}
