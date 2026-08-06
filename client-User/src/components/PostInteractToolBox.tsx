import { Tooltip } from "@radix-ui/themes";
import { IconButton } from "@radix-ui/themes";
import {
  HeartIcon,
  HeartFilledIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { RootState } from "../store/store";
import { Post } from "./AllPostContainer";
import { Navigate } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

interface PostInteractParams {
  commentBoxRef: RefObject<HTMLDivElement | null>;
  post: Post;
  setPostLoveNum: Dispatch<SetStateAction<number | null>>;
}

export function PostInteractToolBox({
  commentBoxRef,
  post,
  setPostLoveNum,
}: PostInteractParams) {
  const theme = useSelector((state: RootState) => state.theme.value);
  const auth = useSelector(
    (state: RootState) => state.auth.value.isAuthenticated,
  );
  const navigate = useNavigate();
  const [lovesPost, setLovesPost] = useState<boolean | null>(null);
  useEffect(() => {
    const getIfUserLoves = async () => {
      try {
        const response = await fetch(`/api/post/checklove/${post.id}`);
        if (!response.ok)
          return (
            <Navigate
              to="/errorpage"
              state={{
                title: "Oppsies",
                message: "An Error Occured Fetching Data From the Server",
              }}
            />
          );

        const data = await response.json();
        if (data.isLoved) {
          setLovesPost(true);
        } else {
          setLovesPost(false);
        }
      } catch (e) {
        // nav to error page;
        return (
          <Navigate
            to="/errorpage"
            state={{
              title: "Oppsies",
              message: "An Error Occured Fetching Data From the Server",
            }}
          />
        );
      }
    };
    getIfUserLoves();
  }, [lovesPost]);

  const loveCurrentPost = async () => {
    if (!auth) {
      navigate("/login", { viewTransition: true });
    }

    try {
      const response = await fetch(`/api/post/${post.id}/love`, {
        method: "POST",
      });
      if (!response.ok) {
        return (
          <Navigate
            to="/errorpage"
            state={{
              title: "Oppsies",
              message: "An Error Occured Fetching Data From the Server",
            }}
          />
        );
      }
      const data = await response.json();
      if (data.isLoved) {
        setPostLoveNum((state): number => (state || 0) + 1);
      } else {
        setPostLoveNum((state): number => (state || 1) - 1);
      }
      setLovesPost(data.isLoved);
    } catch (e: unknown) {
      //nav to error page
      return (
        <Navigate
          to="/errorpage"
          state={{
            title: "Oppsies",
            message: "An Error Occured Fetching Data From the Server",
          }}
        />
      );
    }
  };

  const onCommentIntent = () => {
    if (!commentBoxRef || !commentBoxRef.current) return;

    commentBoxRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="sm: mt-4 flex flex-row justify-end gap-3 pr-0 sm:ml-2 sm:flex-col sm:justify-start sm:pr-0">
      <Tooltip content="love">
        <IconButton
          onClick={loveCurrentPost}
          radius="full"
          color={theme == "light" ? "blue" : "green"}
          size={"3"}
          style={{
            cursor: "pointer",
            border: `1px solid ${theme == "light" ? "green" : "yellow"}`,
          }}
        >
          {lovesPost ? <HeartFilledIcon /> : <HeartIcon />}
        </IconButton>
      </Tooltip>
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
