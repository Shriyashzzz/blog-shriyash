import Markdown from "react-markdown";
import remarkGm from "remark-gfm";
import { Post } from "./AllPostContainer";
import { Link, useNavigate } from "react-router";

interface PreviewPostProps {
  post: Post;
}

export function PreviewPost({ post }: PreviewPostProps) {
  const navigate = useNavigate();
  const navToViewPost = (): void => {
    navigate(`/viewpost/${post.id}`);
  };

  return (
    <article
      onClick={() => navToViewPost()}
      className="flex h-full min-h-28 cursor-pointer flex-col justify-around bg-gray-100 p-2 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl dark:bg-gray-500 dark:hover:shadow-green-950"
    >
      <div>
        <h1 className="cursor-pointer font-bold text-green-700 dark:text-green-500">
          {post.title}
        </h1>
      </div>
      <div className="line-clamp-2 max-w-[1600px] truncate">
        <Markdown remarkPlugins={[remarkGm]}>{post.content}</Markdown>
      </div>
    </article>
  );
}
