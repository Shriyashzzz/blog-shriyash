import { useParams } from "react-router";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { MySpinner } from "../components/MySpinner";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { AuthorCard } from "../components/AuthorCard";

interface Author {
  username: string;
  email: string;
}

export interface Post {
  authorId: number;
  author: Author;
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
    return (
      <Navigate
        to="/errorpage"
        state={{
          title: "OPPS WE GOT THE ERROR: 500",
          message: "Could not fetch the Post",
        }}
        replace //stops the user from hitting "back" and landing on a broken/errored page
      />
    );
  }
  if (loading || !post) {
    return <MySpinner />;
  }
  console.log(post);
  return (
    <div className="prose prose-headings:text-green-700 dark:prose-invert prose-p:text-base sm:prose-p:text-xl prose-pre:max-h-120 prose-pre:overflow-x-auto mx-auto flex w-full max-w-4xl flex-col bg-gray-200 p-4 sm:p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="w-full text-green-700">{post.title}</h1>
      <section>
        <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
          {post.content}
        </Markdown>
        <AuthorCard />
      </section>
    </div>
  );
}
