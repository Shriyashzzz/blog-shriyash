import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { PreviewPost } from "./PreviewPost";
import { Spinner } from "@radix-ui/themes";

export interface Post {
  authorId: number;
  content: string;
  createdAt: string;
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
    return (
      <div className="flex h-dvh justify-center pt-5">
        <Spinner size="3" />
      </div>
    );
  }

  return (
    <section className="m-5 grid h-full auto-rows-fr grid-cols-1 gap-4">
      {posts.map((post) => {
        return <PreviewPost key={post.id} post={post} />;
      })}
    </section>
  );
}
