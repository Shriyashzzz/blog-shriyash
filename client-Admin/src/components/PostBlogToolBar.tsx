import { MDXEditorMethods } from "@mdxeditor/editor";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Flex, Switch, Text } from "@radix-ui/themes";
import { AlertDialog } from "radix-ui";
import { useNavigate } from "react-router";

interface Props {
  markdownRef: React.RefObject<MDXEditorMethods | null>;
  title: SetStateAction<string>;
}

export function PostBlogToolBar({ markdownRef, title }: Props) {
  const navigate = useNavigate();
  const [publishState, setPublishState] = useState<boolean>(false);
  const addNewBlog = async () => {
    try {
      if (!title || !markdownRef) return;
      const requestBody = {
        title: title,
        content: markdownRef.current?.getMarkdown(),
        published: publishState,
      };

      const response = await fetch("/api/admin/posts/newpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        navigate("/", { viewTransition: true });
        return;
      }
      const data = await response.json();
      navigate("/error", {
        viewTransition: true,
        state: { title: "Error: 500", message: data.message },
      });
      return;
    } catch (e) {
      navigate("/error", {
        viewTransition: true,
        state: { title: "Error", message: "Unable to create a new Post" },
      });
    }
  };

  return (
    <section className="flex items-center justify-center gap-4 self-end-safe">
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

      <div className="flex items-center gap-3">
        <p>Ready To Post?</p>
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button color="red" style={{ cursor: "pointer" }}>
              Post
            </Button>
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-112.5 bg-gray-900 p-6 rounded-lg shadow-xl">
              <AlertDialog.Title className="text-white text-lg font-semibold">
                Publish post
              </AlertDialog.Title>
              <AlertDialog.Description className="text-gray-400 mt-2">
                This will make your post publicly visible.
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
                    style={{ cursor: "pointer" }}
                    className="w-full"
                    color="green"
                    onClick={addNewBlog}
                  >
                    Publish
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
