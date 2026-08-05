import type { Author } from "../Pages/ViewPost";
import { Avatar, Button } from "@radix-ui/themes";
import { initialExtract } from "../utils/initialExtractor";
import { normalizeDate } from "../utils/normalizeDate";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export interface Comment {
  author: Author;
  content: string;
  id: number;
  postedAt: string;
}

interface CommentProp {
  comments: Comment[];
}

export function ViewComments({ comments }: CommentProp) {
  const authState = useSelector((state: RootState) => state.auth.value);
  if (comments.length == 0) {
    return <></>;
  }

  return (
    <section className="mt-4 flex w-full max-w-4xl flex-col">
      {comments.map((cmt) => {
        return (
          <article
            key={`${cmt.id}${cmt.author}`}
            className="flex flex-row gap-4 bg-gray-100 p-2 dark:bg-gray-800"
          >
            <Avatar
              className="mt-2 border border-gray-300"
              src={
                cmt.author.role == "Admin"
                  ? "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjRqbHBiaTVqemJtZHFlcjlldjMycm9xNjV0NmUyeGlzYmFrYjVjYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/atQF1zaSGq8s8/giphy.gif"
                  : undefined
              }
              fallback={initialExtract(cmt.author.username)}
            />

            <div className="flex w-full flex-col gap-1">
              <div>
                <p className="font-black text-blue-600">
                  {cmt.author.role == "Admin" ? "Author" : cmt.author.username}
                </p>

                {authState.user && cmt.author.id === authState.user.id && (
                  <Button>Delete</Button>
                )}
              </div>

              <p className="text-xs font-medium text-amber-600">
                {normalizeDate(cmt.postedAt)}
              </p>

              <div className="font-medium">
                <Markdown remarkPlugins={[remarkGfm]}>{cmt.content}</Markdown>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
