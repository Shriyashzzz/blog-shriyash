import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { PreviewPost } from "./PreviewPost";
import { Navigate } from "react-router";
import { MySpinner } from "./MySpinner";

import { ToolBar } from "./ToolBar";

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
    return (
      <Navigate
        to="/errorpage"
        state={{
          title: "OPPS WE GOT THE ERROR: 500",
          message: "Could not fetch the Posts",
        }}
        replace //stops the user from hitting "back" and landing on a broken/errored pages
      />
    );
  }
  if (loading || posts.length == 0) {
    return <MySpinner />;
  }

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <ToolBar def={"Home"} />
      </div>

      <section className="mt-5 grid h-full auto-rows-fr grid-cols-1 gap-4 max-sm:w-full">
        {posts.map((post) => {
          return <PreviewPost key={post.id} post={post} />;
        })}
      </section>
    </>
  );
}
