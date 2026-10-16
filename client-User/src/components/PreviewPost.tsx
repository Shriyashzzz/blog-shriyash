import Markdown from "react-markdown";
import remarkGm from "remark-gfm";
import { Post } from "./AllPostContainer";
import { useNavigate } from "react-router";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { remark } from "remark";
import { useEffect, useState } from "react";
import strip from "strip-markdown";

interface PreviewPostProps {
  post: Post;
}

export function PreviewPost({ post }: PreviewPostProps) {
  const navigate = useNavigate();
  const navToViewPost = (): void => {
    navigate(`/viewpost/${post.id}`);
  };
  const [postContent, setPostContent] = useState<string>("");
  useEffect(() => {
    const stripLinks = async () => {
      const postContent = await remark().use(strip).process(post.content);
      setPostContent(String(postContent));
    };
    stripLinks();
  }, [post]);
  return (
    <article
      onClick={() => navToViewPost()}
      className="mx-auto flex h-full min-h-35 w-full cursor-pointer flex-col justify-around bg-gray-100 p-2 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl max-sm:w-full xl:w-4/5 dark:bg-gray-500 dark:hover:shadow-green-950"
    >
      <div>
        <h1 className="cursor-pointer text-lg font-bold text-green-700 sm:text-2xl dark:text-green-500">
          {post.title}
        </h1>
      </div>
      <div className="line-clamp-2 max-w-[1600px] truncate [&_strong]:font-normal">
        <Markdown
          remarkPlugins={[remarkGm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {postContent}
        </Markdown>
      </div>
    </article>
  );
}
