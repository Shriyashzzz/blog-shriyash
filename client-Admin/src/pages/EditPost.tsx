import { useParams } from "react-router";
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
import { headingsPlugin, MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { TitleTextField } from "../components/TitleTextField";
import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router";
import { Spinner } from "@radix-ui/themes";
import { EditBlogToolBar } from "../components/EditBlogToolBar";

interface FetchResponse {
  data: { post: Post | null } | null | undefined;
  loading: boolean;
  error: string | null;
}

export function EditPost() {
  const { postId } = useParams();
  const markdownRef = useRef<MDXEditorMethods>(null);
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const { data, loading, error }: FetchResponse = useFetch(
    `/api/admin/posts/getpost/${postId}`,
  );

  useEffect(() => {
    if (data && data.post) {
      setPost(data.post);
      setTitle(data.post.title);
      return;
    }
  }, [data]);
  if (!post) {
    return <Spinner />;
  }
  return (
    <div className="w-full sm:w-4/5">
      <EditBlogToolBar title={title} markdownRef={markdownRef} post={post} />
      <section className="flex gap-5 bg-gray-900 p-3">
        <TitleTextField setTitle={setTitle} title={title} />
      </section>
      <MDXEditor
        className="prose gap-5 border prose-quotes:text-blue-600 prose-headings:dark:text-white dark:prose-invert prose-p:text-base sm:prose-p:text-xl prose-pre:max-h-120 mx-auto flex w-full max-w-full flex-col bg-gray-200  leading-relaxed  dark:bg-gray-900 dark:text-white"
        ref={markdownRef}
        markdown={post.content}
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
