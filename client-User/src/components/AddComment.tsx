import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TextArea } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { Comment } from "./ViewComment";

interface PropData {
  postId: number;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  commentBoxRef: RefObject<HTMLTextAreaElement | null>;
  onCommentAdded: () => void;
}

export function AddComment({
  postId,
  setComments,
  commentBoxRef,
  onCommentAdded,
}: PropData) {
  const auth = useSelector(
    (state: RootState) => state.auth.value.isAuthenticated,
  );
  const [textValue, setTextValue] = useState<string>("");
  const navigate = useNavigate();
  const handleCommentBoxClick = (): void => {
    if (!auth) navigate("/login", { viewTransition: true });
  };

  const onCOmmentChnage = (e: React.SyntheticEvent<{ value: string }>) => {
    if (e.currentTarget.value.length > 300) return;
    setTextValue(e.currentTarget.value);
  };

  const handleOnSubmit = async () => {
    if (textValue.length <= 1) return;
    const commentPayload = {
      commentContent: textValue,
    };
    try {
      const response = await fetch(`/api/comment/newComment/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(commentPayload),
      });
      if (!response.ok) console.log("error adding comment");
      const data = await response.json();
      if (commentBoxRef.current) commentBoxRef.current.value = "";
      setComments(data.comments);
      onCommentAdded();
      return;
    } catch (e: unknown) {
      navigate("/errorpage", {
        state: { title: "OoOps", message: "Something went wrong" },
      });
      return;
    }
  };

  return (
    <>
      <div className="mt-4 flex w-full flex-col gap-1">
        <TextArea
          onClick={handleCommentBoxClick}
          value={textValue}
          onChange={(e) => onCOmmentChnage(e)}
          color={"grass"}
          placeholder={auth ? "Add Comment" : "Please sign in to comment "}
        />
        <Button color="amber" variant="solid" onClick={handleOnSubmit}>
          {auth ? "Add Comment" : "Please sign in to comment "}
          <PaperPlaneIcon />
        </Button>
      </div>
    </>
  );
}
