import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";
import { useState } from "react";
import { TextField } from "@radix-ui/themes";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { SendNewsLetter } from "../components/SendNewsLetter";

export function NewNewsLetter() {
  const [html, setHtml] = useState<string>("");
  const [subject, setSubject] = useState<string>("");

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }

  return (
    <div className="  w-full sm:w-4/5 p-5 gap-5 flex flex-col">
      <SendNewsLetter html={html} subject={subject} />
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
