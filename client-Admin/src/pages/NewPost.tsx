import {
  MDXEditor,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  imagePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  linkDialogPlugin,
  CodeToggle,
  InsertImage,
  InsertThematicBreak,
  ListsToggle,
  CreateLink,
  InsertCodeBlock,
  codeBlockPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
} from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor";
import { useRef, useEffect } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export function NewPost() {
  const markdownRef = useRef<MDXEditorMethods>(null);
  const markdown = `
   
    `;

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
        className="prose prose-headings:text-green-700 dark:prose-invert prose-p:text-base sm:prose-p:text-xl prose-pre:max-h-120 mx-auto flex w-full max-w-full flex-col bg-gray-200 p-4 leading-relaxed sm:p-6 dark:bg-gray-900 dark:text-white"
        ref={markdownRef}
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          imagePlugin(),
          linkDialogPlugin(),
          thematicBreakPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              tsx: "TypeScript",
            },
          }),
          toolbarPlugin({
            toolbarClassName: "toolbar",
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <InsertImage />
                <InsertThematicBreak />
                <ListsToggle />
                <CreateLink />
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                />
              </>
            ),
          }),
        ]}
        onChange={() => console.log(markdownRef.current?.getMarkdown())}
      />
    </div>
  );
}
