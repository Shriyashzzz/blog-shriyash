import type { Author } from "../Pages/ViewPost";
import { Avatar, Button } from "@radix-ui/themes";
import { initialExtract } from "../utils/initialExtractor";
import { normalizeDate } from "../utils/normalizeDate";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TrashIcon } from "@radix-ui/react-icons";
import { SetStateAction, Dispatch } from "react";

export interface Comment {
  author: Author;
  content: string;
  id: number;
  postedAt: string;
  postId: number;
}

interface CommentProp {
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
  viewCommentRef: React.RefObject<HTMLElement | null>;
}

type DeleteResponse = { message: string; comments: Comment[] };

export function ViewComments({
  comments,
  setComments,
  viewCommentRef,
}: CommentProp) {
  const authState = useSelector((state: RootState) => state.auth.value);
  if (comments.length == 0) {
    return <></>;
  }

  const onDeleteComment = async (commentId: number, postId: number) => {
    if (!authState.isAuthenticated) return;

    const response = await fetch(`/api/comment/${postId}/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) return;
    const data: DeleteResponse = await response.json();
    setComments(data.comments);
    return;
  };

  return (
    <section className="mt-4 flex h-fit w-full flex-col">
      {comments.map((cmt, indx) => {
        return (
          <article
            key={`${cmt.id}${cmt.author}`}
            className="flex h-fit flex-row gap-4 bg-gray-100 p-2 dark:bg-gray-800"
            ref={indx === 0 ? viewCommentRef : undefined}
          >
            <Avatar
              size="3"
              radius="full"
              className="mt-2 border border-gray-300"
              src={
                cmt.author.role == "Admin"
                  ? "https://scontent-sjc6-1.xx.fbcdn.net/v/t39.30808-6/684262166_26612009511790748_2315032028178435336_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=r-iOFVaVBREQ7kNvwFSiHTI&_nc_oc=AdpxCQ2Llo91ug6hX1E0jvPx8aewLeH0Tlu3LnDlkU9xTrydym602IztwBsgqyalqvJ8onM8GYXlHsFyhm6jXfE6&_nc_zt=23&_nc_ht=scontent-sjc6-1.xx&_nc_gid=_tntilGb5NTS23LVOdpo8g&_nc_ss=7b2a8&oh=00_AQG1oDZtmr36czaM4cRjECG2Ezr0wgNiTBQJ8W8uSMkSqw&oe=6A78F759"
                  : undefined
              }
              fallback={initialExtract(cmt.author.username)}
            />

            <div className="flex w-full min-w-0 flex-col gap-1">
              <div className="flex w-full flex-row justify-between">
                <p className="font-black text-blue-600">
                  {cmt.author.role == "Admin" ? "Author" : cmt.author.username}
                </p>

                {authState.user && cmt.author.id === authState.user.id && (
                  <Button
                    color="gray"
                    style={{ cursor: "pointer" }}
                    onClick={() => onDeleteComment(cmt.id, cmt.postId)}
                  >
                    <TrashIcon scale={4} />
                  </Button>
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
