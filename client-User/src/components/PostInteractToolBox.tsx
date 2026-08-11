import { Tooltip } from "@radix-ui/themes";
import { IconButton } from "@radix-ui/themes";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { Dispatch, RefObject, SetStateAction } from "react";
import { RootState } from "../store/store";
import { Post } from "./AllPostContainer";
import { LovePost } from "./LovePost";

interface PostInteractParams {
  commentBoxRef: RefObject<HTMLTextAreaElement | null>;
  post: Post;
  setPostLoveNum: Dispatch<SetStateAction<number | null>>;
}

export function PostInteractToolBox({
  commentBoxRef,
  post,
  setPostLoveNum,
}: PostInteractParams) {
  const theme = useSelector((state: RootState) => state.theme.value);

  const onCommentIntent = () => {
    if (!commentBoxRef || !commentBoxRef.current) return;
    commentBoxRef.current.scrollIntoView({
      behavior: "smooth",
    });
    commentBoxRef.current.focus();
    return;
  };

  return (
    <div className="sm: mt-4 flex flex-row justify-end gap-3 pr-0 sm:ml-2 sm:flex-col sm:justify-start sm:pr-0">
      <LovePost
        post={post}
        setPostLoveNum={setPostLoveNum}
        color={theme == "light" ? "blue" : "green"}
      />
      <Tooltip content="Comment">
        <IconButton
          radius="full"
          color={theme == "light" ? "blue" : "green"}
          size={"3"}
          onClick={onCommentIntent}
          style={{
            cursor: "pointer",
            border: `1px solid ${theme == "light" ? "green" : "yellow"}`,
          }}
        >
          <ChatBubbleIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
