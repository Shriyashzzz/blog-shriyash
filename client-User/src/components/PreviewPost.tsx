import Markdown from "react-markdown";
import remarkGm from "remark-gfm";
import { Post } from "./AllPostContainer";

interface PreviewPostProps {
  post: Post;
}

export function PreviewPost({ post }) {
  return (
    <article className="flex h-full min-h-28 flex-col justify-around bg-gray-100 p-2 dark:bg-gray-500">
      <div>
        <h1 className="cursor-pointer font-bold text-green-700 hover:text-blue-500 dark:text-green-500 dark:hover:text-blue-900">
          {post.title}
        </h1>
      </div>
      <div className="line-clamp-2 max-w-[1600px] truncate">
        <Markdown remarkPlugins={[remarkGm]}>{post.content}</Markdown>
      </div>
    </article>
  );
}
