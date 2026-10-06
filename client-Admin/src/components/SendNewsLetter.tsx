import { MDXEditorMethods } from "@mdxeditor/editor";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Flex, Switch, Text } from "@radix-ui/themes";
import { AlertDialog } from "radix-ui";
import { useNavigate } from "react-router";

interface Props {
  html: string;
  subject: string;
  isEdited?: boolean;
  id?: number;
}

export function SendNewsLetter({ html, subject, isEdited, id }: Props) {
  const navigate = useNavigate();
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const sendNewsletter = async () => {
    try {
      if (!subject || !html) return;
      const requestBody = {
        subject: subject,
        html: html,
        isDraft: isDraft,
      };

      const response = await fetch("/api/newsletter/create", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        navigate("/home/newsletters", { viewTransition: true });
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
        state: { title: "Error", message: "Unable to create a new Post" },
      });
    }
  };

  return (
    <section className="flex items-center justify-center gap-4 self-end-safe">
      <Flex gap={"2"}>
        <Text size="2" className="text-gray-300">
          {isDraft ? "Draft" : "Ready"}
        </Text>
        <Switch
          style={{ cursor: "pointer" }}
          checked={isDraft}
          onCheckedChange={() => setIsDraft(!isDraft)}
          color="red"
        />
      </Flex>

      <div className="flex items-center gap-3">
        <p> {!isDraft ? "Ready To Post?" : "Update Draft?"}</p>
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button color="red" style={{ cursor: "pointer" }}>
              {!isDraft ? "Post" : "Save"}
            </Button>
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-112.5 bg-gray-900 p-6 rounded-lg shadow-xl">
              <AlertDialog.Title className="text-white text-lg font-semibold">
                <p> {!isDraft ? "Send Newsletter !" : "Update Draft ?"}</p>
              </AlertDialog.Title>
              <AlertDialog.Description className="text-gray-400 mt-2">
                {!isDraft && " This will make your post publicly visible."}
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
                    onClick={sendNewsletter}
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
