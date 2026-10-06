import { useParams } from "react-router";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";
import { useEffect, useState } from "react";
import { TextField } from "@radix-ui/themes";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { SendNewsLetter } from "../components/SendNewsLetter";
import { useNavigate } from "react-router";

export function EditNewsLetter() {
  const navigate = useNavigate();
  const [html, setHtml] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const { letterId } = useParams();
  const [isViewMode, setIsViewMode] = useState<boolean>(true);

  useEffect(() => {
    async function getSave() {
      const response = await fetch(`/api/newsletter/get/${letterId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.letter.draft) setIsViewMode(false);
        setHtml(data.letter.html);
        setSubject(data.letter.subject);
      } else {
        navigate("/error", { viewTransition: true });
      }
    }
    getSave();
  }, [letterId]);

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }

  return (
    <div className="  w-full sm:w-4/5 p-5 gap-5 flex flex-col">
      {!isViewMode && (
        <SendNewsLetter
          html={html}
          subject={subject}
          isEdited={true}
          id={letterId}
        />
      )}

      <section className="flex gap-5 bg-gray-900 p-3  ">
        <TextField.Root
          value={subject && subject}
          placeholder="Subject"
          style={{
            fontSize: "1rem",
            height: "2rem",
            fontWeight: "bold",
          }}
          onChange={(e) => setSubject(e.currentTarget.value)}
          className=" w-full placeholder:text-white h-full dark:bg-gray-900 "
        >
          <TextField.Slot>
            <CaretRightIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </section>
      <Editor value={html} onChange={onChange} />
    </div>
  );
}
