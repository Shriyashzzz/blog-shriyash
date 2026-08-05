import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { PreviewPost } from "./PreviewPost";
import { useNavigate } from "react-router";
import { MySpinner } from "./MySpinner";

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
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<PostsResponse>("/api/");
  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);
  if (error) {
    navigate("/errorpage", {
      state: {
        title: "OPPS WE GOT THE ERROR: 500",
        message: "Could not fetch the Posts",
      },
    });
    return null;
  }
  if (loading || posts.length == 0) {
    return <MySpinner />;
  }

  return (
    <section className="m-5 grid h-full auto-rows-fr grid-cols-1 gap-4">
      {posts.map((post) => {
        return <PreviewPost key={post.id} post={post} />;
      })}
    </section>
  );
}
