import { Button, Switch } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Props {
  post: Post;
}

export function PostItemButton({ post }: Props) {
  const navigate = useNavigate();
  const [publishedState, setPublishedState] = useState(post.published);
  const changePublishstatus = async (e: SyntheticEvent<HTMLButtonElement>) => {
    const publish = e.currentTarget.dataset.state === "checked" ? true : false;
    setPublishedState(!publish);
    try {
      const reqBody = { published: !publish };

      const response = await fetch(`/api/admin/posts/update/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) {
        const data = await response.json();
        navigate("/error", {
          state: {
            title: "POST PATCH ERROR",
            message: data.message,
          },
        });
      }
    } catch (e) {
      navigate("/error", {
        state: {
          title: "POST PATCH ERROR",
          message: "Unable to change post publish state",
        },
      });
    }
  };

  return (
    <div className="flex  items-center justify-between ">
      <Button color="red" style={{ cursor: "pointer" }}>
        Edit Post
        <ArrowRightIcon />
      </Button>
      <span className="flex items-center gap-1 font-bold">
        Publish:{" "}
        <Switch
          style={{ cursor: "pointer" }}
          checked={publishedState}
          onClick={(e) => changePublishstatus(e)}
        />
      </span>
    </div>
  );
}
