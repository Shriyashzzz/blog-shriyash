import { Box, Container } from "@radix-ui/themes";
import {
  CalendarIcon,
  EyeOpenIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { dateParser } from "../util/dateParse";
import { PostItemButton } from "./PostItemButtons";
interface Props {
  post: Post;
}

export function PostItem({ post }: Props) {
  return (
    <Box
      style={{
        background: "var(--gray-a2)",
        borderRadius: "var(--radius-3)",
        minWidth: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <section className="p-6 justify-between ">
        <div className="flex justify-center gap-4 flex-col min-w-0">
          <h1 className="font-extrabold">{post.title}</h1>
          <span className="flex items-center gap-2 ">
            <CalendarIcon /> {dateParser(post.createdAt)}
          </span>
          <span className="flex items-center gap-2">
            <EyeOpenIcon /> {post.viewCount}
          </span>
          <span className="flex items-center gap-2">
            Published:{" "}
            {post.published ? <CheckCircledIcon /> : <CrossCircledIcon />}
          </span>
        </div>
      </section>
      {/* buttons */}
      <div className="p-5">
        <PostItemButton post={post} />
      </div>
    </Box>
  );
}
