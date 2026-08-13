import { MDXEditorMethods } from "@mdxeditor/editor";
import { SetStateAction, useState } from "react";
import { Button, Flex, Switch, Text } from "@radix-ui/themes";
import { AlertDialog } from "radix-ui";
import { useNavigate } from "react-router";

interface Props {
  markdownRef: React.RefObject<MDXEditorMethods | null>;
  title: SetStateAction<string>;
  post: Post;
}

export function EditBlogToolBar({ markdownRef, title, post }: Props) {
  const navigate = useNavigate();
  const [publishState, setPublishState] = useState<boolean>(post.published);

  const deleteBlog = async () => {
    const response = await fetch(`/api/admin/posts/delete/${post.id}`, {
      credentials: "include",
      method: "DELETE",
    });
    if (response.ok) {
      navigate("/", { viewTransition: true });
      return;
    } else {
      const data = await response.json();
      navigate("/error", { state: { title: "Error", message: data.message } });
    }
  };

  const addNewBlog = async () => {
    try {
      if (!title || !markdownRef) return;
      const requestBody = {
        title: title,
        content: markdownRef.current?.getMarkdown(),
        published: publishState,
      };

      console.log(requestBody);
      const response = await fetch(`/api/admin/posts/update/${post.id}`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        navigate("/", { viewTransition: true });
        return;
      }
      const data = await response.json();
      console.log(data);
      navigate("/error", {
        viewTransition: true,
        state: { title: "Error: 500", message: data.message },
      });
      return;
    } catch (e) {
      navigate("/error", {
        viewTransition: true,
        state: { title: "Error", message: "Unable to update your Post" },
      });
    }
  };

  return (
    <section className="flex items-center m-4 gap-4 justify-between">
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button color="red" style={{ cursor: "pointer" }}>
            Delete
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-112.5 bg-gray-900 p-6 rounded-lg shadow-xl">
            <AlertDialog.Title className="text-white text-lg font-semibold">
              {publishState ? "Delete Post" : "Delete Draft"}
            </AlertDialog.Title>
            <AlertDialog.Description className="text-gray-400 mt-2">
              There is no backup? Are you sure you want to delete this{" "}
              {publishState ? "post" : "draft"}?
            </AlertDialog.Description>
            <div className="flex gap-3 items-center justify-end mt-4 h-full w-full">
              <AlertDialog.Cancel asChild>
                <Button style={{ cursor: "pointer" }} variant="soft">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  variant="classic"
                  style={{ cursor: "pointer", padding: "5px" }}
                  color="red"
                  onClick={deleteBlog}
                >
                  Delete
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      <div className="flex items-center gap-3">
        <Flex gap={"2"}>
          <Text size="2" className="text-gray-300">
            {publishState ? "Publish" : "Draft"}
          </Text>
          <Switch
            style={{ cursor: "pointer" }}
            checked={publishState}
            onCheckedChange={() => setPublishState(!publishState)}
            color="red"
          />
        </Flex>
        <p>Ready?</p>
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button
              color="green"
              style={{ cursor: "pointer", padding: "5px" }}
              className="w-full"
            >
              Update
            </Button>
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-112.5 bg-gray-900 p-6 rounded-lg shadow-xl">
              <AlertDialog.Title className="text-white text-lg font-semibold">
                Update post
              </AlertDialog.Title>
              <AlertDialog.Description className="text-gray-400 mt-2">
                There is no Rollback? Are you sure?
              </AlertDialog.Description>

              <div className="flex gap-3 items-center justify-end mt-4 h-full w-full">
                <AlertDialog.Cancel asChild>
                  <Button style={{ cursor: "pointer" }} variant="soft">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button
                    variant="classic"
                    style={{ cursor: "pointer", padding: "5px" }}
                    color="green"
                    onClick={addNewBlog}
                  >
                    Update
                  </Button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
    </section>
  );
}
