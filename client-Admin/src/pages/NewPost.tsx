import { MDXEditor } from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor";
import { useRef } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Button } from "@radix-ui/themes";

export function NewPost() {
  const markdownRef = useRef<MDXEditorMethods>(null);

  return (
    <div className=" h-full w-4/5 p-5 gap-5 flex flex-col">
      <div className="flex gap-5 bg-gray-900 p-3  ">
        <textarea
          placeholder="Title"
          className=" w-full  text-green-700 text-3xl p-2 font-extrabold"
          name="Title"
          id="postTitle"
        ></textarea>
      </div>

      <MDXEditor
        className="bg-gray-800 h-full text-2xl"
        ref={markdownRef}
        markdown={""}
        plugins={[headingsPlugin()]}
        onChange={() => console.log(markdownRef.current?.getMarkdown())}
      />
    </div>
  );
}
