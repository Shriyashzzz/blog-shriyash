import { Tooltip } from "@radix-ui/themes";
import { IconButton } from "@radix-ui/themes";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction, useEffect } from "react";
import { RootState } from "../store/store";
import { Post } from "./AllPostContainer";
import { Navigate } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { IconButtonProps } from "@radix-ui/themes";

interface LovePostParams {
  post: Post;
  setPostLoveNum: Dispatch<SetStateAction<number | null>>;
  color?: IconButtonProps["color"];
  size?: "1" | "2" | "3" | "4";
  style?: object;
}

export function LovePost({
  post,
  setPostLoveNum,
  color,
  size,
  style,
}: LovePostParams) {
  const theme = useSelector((state: RootState) => state.theme.value);
  const auth = useSelector(
    (state: RootState) => state.auth.value.isAuthenticated,
  );
  const navigate = useNavigate();
  const [lovesPost, setLovesPost] = useState<boolean | null>(null);
  useEffect(() => {
    const getIfUserLoves = async () => {
      try {
        const response = await fetch(`/api/post/checklove/${post.id}`, {
          credentials: "include",
        });
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
        credentials: "include",
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

  return (
    <Tooltip content="love">
      <IconButton
        onClick={loveCurrentPost}
        radius="full"
        color={color || (theme == "light" ? "blue" : "green")}
        size={size || "3"}
        style={
          style || {
            cursor: "pointer",
            border: `1px solid ${theme == "light" ? "green" : "yellow"}`,
          }
        }
      >
        {lovesPost ? <HeartFilledIcon /> : <HeartIcon />}
      </IconButton>
    </Tooltip>
  );
}
