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
  InsertTable,
  tablePlugin,
  linkPlugin,
} from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor";
import { useRef, useState } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { TitleTextField } from "../components/TitleTextField";
import { PostBlogToolBar } from "../components/PostBlogToolBar";
import { EditorView } from "@codemirror/view";

const codeMirrorDarkTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#111827", // gray-900
      color: "#f3f4f6", // gray-100
    },
    ".cm-content": {
      caretColor: "#f3f4f6",
    },
    ".cm-gutters": {
      backgroundColor: "#111827 !important",
      color: "#9ca3af", // gray-400
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(255, 255, 255, 0.03)",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(255, 255, 255, 0.03)",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
      backgroundColor: "rgba(59, 130, 246, 0.25) !important",
    },
    ".cm-cursor": {
      borderLeftColor: "#f3f4f6",
    },
  },
  { dark: true },
);

export function NewPost() {
  const markdownRef = useRef<MDXEditorMethods>(null);
  const [title, setTitle] = useState<string>("");
  return (
    <div className="  w-full sm:w-4/5 p-5 gap-5 flex flex-col">
      <PostBlogToolBar title={title} markdownRef={markdownRef} />
      <section className="flex gap-5 bg-gray-900 p-3  ">
        <TitleTextField setTitle={setTitle} />
      </section>
      <MDXEditor
        className="prose h-full border prose-headings:dark:text-white dark:prose-invert prose-p:text-base sm:prose-p:text-xl prose-pre:max-h-120 mx-auto flex w-full max-w-full flex-col bg-gray-200  leading-relaxed  dark:bg-gray-900 dark:text-white"
        ref={markdownRef}
        markdown={""}
        plugins={[
          tablePlugin(),
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          imagePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          thematicBreakPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              tsx: "TypeScript",
            },
            codeMirrorExtensions: [codeMirrorDarkTheme],
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
                <InsertTable />
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
