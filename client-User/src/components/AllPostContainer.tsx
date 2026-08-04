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
    <section className="m-5 grid h-full auto-rows-fr grid-cols-1 gap-4">
      {posts.map((post) => {
        return (
          <article className="flex h-full flex-col justify-around bg-gray-100 p-2 dark:bg-gray-500">
            <div>
              <h1 className="cursor-pointer font-bold text-green-700 dark:text-green-500">
                {post.title}
              </h1>
            </div>
            <p className="line-clamp-2 max-w-[1600px] truncate">
              <Markdown remarkPlugins={[remarkGm]}>{post.content}</Markdown>
            </p>
          </article>
        );
      })}
    </section>
  );
}
