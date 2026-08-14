import type { Author } from "../pages/ViewPost";
import { Avatar, Button, Container } from "@radix-ui/themes";
import { initialExtract } from "../utils/initialExtractor";
import { normalizeDate } from "../utils/normalizeDate";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TrashIcon } from "@radix-ui/react-icons";
import { SetStateAction, Dispatch } from "react";
import AurthorIcon from "../assets/icons/authorIcon.jpg";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

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
    return (
      <Container
        size="3"
        width={"100%"}
        height={"50px"}
        className="mt-2 rounded-md bg-amber-400"
      >
        <div className="flex h-full items-center justify-center gap-4">
          <InfoCircledIcon color="black" className="h-5 w-5" />{" "}
          <p className="font-medium text-black">
            {" "}
            No Comments. You can be the first{" "}
            {!authState.isAuthenticated && "Sign in!"}
          </p>
        </div>
      </Container>
    );
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
              src={cmt.author.role == "Admin" ? AurthorIcon : undefined}
              fallback={initialExtract(cmt.author.username)}
            />

            <div className="flex w-full min-w-0 flex-col gap-1">
              <div className="flex w-full flex-row justify-between">
                <p className="font-black text-blue-600">
                  {cmt.author.role == "Admin" ? "Author" : cmt.author.username}
                </p>

                {authState.user &&
                  (cmt.author.id === authState.user.id ||
                    cmt.author.role == "Admin") && (
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
