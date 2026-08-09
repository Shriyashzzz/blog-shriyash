import { iso8061DateParser } from "../../utils/ISO8061DateParser";
import { useNavigate } from "react-router";

interface SearchCompParams {
  post: {
    id: number;
    title: string;
    createdAt: Date;
    author: {
      username: string;
    };
  };
}

export function SearchDropComp({ post }: SearchCompParams) {
  const stringDateIso = post.createdAt.toString();
  const navigate = useNavigate();

  const viewBlog = (postId: number) => {
    if (!postId) return;
    navigate(`/viewpost/${postId}`, { viewTransition: true });
  };

  return (
    <div
      onClick={() => viewBlog(post.id)}
      className="group dark: w-full cursor-pointer border-b bg-gray-200 p-2 dark:bg-gray-500"
    >
      <p className="text-sm">{`@${post.author.username.toLowerCase()}`}</p>
      <h1 className="font-bold group-hover:text-blue-800">{post.title}</h1>
      <p className="text-sm">{iso8061DateParser(stringDateIso)}</p>
    </div>
  );
}
