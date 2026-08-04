import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGm from "remark-gfm";

interface Post {
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
    return <>Loading</>;
  }

  return (
    <section className="m-5 grid auto-rows-fr grid-cols-1 gap-4">
      {posts.map((post) => {
        return (
          <article className="flex h-full flex-col bg-gray-100 p-2 dark:bg-gray-500">
            <div>
              <h1 className="font-bold">{post.title}</h1>
            </div>
            <p className="line-clamp-3 truncate">
              <Markdown>{post.content}</Markdown>
            </p>
          </article>
        );
      })}
    </section>
  );
}
