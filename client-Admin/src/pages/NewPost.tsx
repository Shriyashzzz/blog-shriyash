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
  BlockTypeSelect,
} from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor";
import { useRef } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { TitleTextField } from "../components/TitleTextField";
import { PostBlog } from "../components/PostBlog";

export function NewPost() {
  const markdownRef = useRef<MDXEditorMethods>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <div className=" h-full w-full sm:w-4/5 p-5 gap-5 flex flex-col">
      <PostBlog titleRef={titleRef} markdownRef={markdownRef} />
      <section className="flex gap-5 bg-gray-900 p-3  ">
        <TitleTextField titleRef={titleRef} />
      </section>
      <MDXEditor
        className="prose h-full border prose-headings:dark:text-white dark:prose-invert prose-p:text-base sm:prose-p:text-xl prose-pre:max-h-120 mx-auto flex w-full max-w-full flex-col bg-gray-200  leading-relaxed  dark:bg-gray-900 dark:text-white"
        ref={markdownRef}
        markdown={""}
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
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <InsertThematicBreak />
                <ListsToggle />
                <CreateLink />
                <InsertImage />
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
      />
    </div>
  );
}
