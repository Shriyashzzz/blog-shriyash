import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { PreviewPost } from "./PreviewPost";
import { Navigate } from "react-router";
import { MySpinner } from "./MySpinner";
import { ToolBar } from "./ToolBar";
import { SearchPost } from "./SearchComponents/SearchPost";
import SubNewsLetter from "./NewsLetter";

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
  const { data, loading, error } = useFetch<PostsResponse>("/api", {
    method: "GET",
    credentials: "include",
  });

  useEffect(() => {
    if (data && data.posts) {
      setPosts(data.posts);
    }
  }, [data]);
  if (error) {
    console.log(error);
    return (
      <Navigate
        to="/errorpage"
        state={{
          title: "OPPS WE GOT THE ERROR: 500",
          message: "Could not fetch the Posts",
        }}
        replace
      />
    );
  }
  if (loading) {
    return <MySpinner />;
  }

  if (posts.length == 0) {
    return (
      <div className="flex h-fit w-4/5 items-center justify-center">
        {" "}
        <h2 className="text-2xl">
          No Posts yet! Meanwhile Sign up for my NewsLetter.
        </h2>
        <p className="text-lg">No Spam emails/promotions promise ;&#41;</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col xl:flex-row">
      <section className="col-start-2 flex w-full flex-col items-center justify-center xl:items-end">
        <div className="flex w-full flex-col items-center gap-2 xl:w-4/5">
          <ToolBar def={"Home"} />
          <SearchPost
            className="w-full"
            placeholder="Search content..."
            variant="classic"
          />
        </div>
        <section className="mt-5 grid h-full w-full auto-rows-fr grid-cols-1 gap-4 xl:w-4/5">
          {posts.map((post) => {
            return <PreviewPost key={post.id} post={post} />;
          })}
        </section>
      </section>
      <SubNewsLetter
        className={"flex w-full justify-center not-xl:justify-start xl:w-1/5"}
      />
    </div>
  );
}
