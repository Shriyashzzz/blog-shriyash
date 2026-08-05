import { useParams } from "react-router";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { MySpinner } from "../components/MySpinner";

export interface Post {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  title: string;
  viewCount: number;
  _count: { loves: number };
}

interface PostResponse {
  post: Post;
}

export function ViewPost() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post>();
  const { data, loading, error } = useFetch<PostResponse>(
    `/api/post/${postId}`,
  );
  useEffect(() => {
    if (data) setPost(data.post);
  }, [data]);

  if (error) {
    <Navigate
      to="/errorpage"
      state={{
        title: "OPPS WE GOT THE ERROR: 500",
        message: "Could not fetch the Post",
      }}
      replace //stops the user from hitting "back" and landing on a broken/errored page
    />;
    return null;
  }
  if (loading || !post) {
    return <MySpinner />;
  }
  console.log(post);
  return (
    <div className="prose dark:prose-invert flex h-dvh min-w-4/5 flex-col bg-gray-200 p-4 dark:bg-gray-900 dark:text-white">
      <h1 className="max-w-200">{post.title}</h1>
      <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
    </div>
  );
}
