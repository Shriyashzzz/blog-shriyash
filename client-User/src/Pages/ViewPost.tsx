import { useParams } from "react-router";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { MySpinner } from "../components/MySpinner";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { AuthorCard } from "../components/AuthorCard";
import { Comment, ViewComments } from "../components/ViewComment";
import { AddComment } from "../components/AddComment";
import { PostInteractToolBox } from "../components/PostInteractToolBox";
import { useRef } from "react";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { CalendarIcon } from "@radix-ui/react-icons";
import { iso8061DateParser } from "../utils/ISO8061DateParser";
import { LovePost } from "../components/LovePost";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export interface Author {
  id: number;
  username: string;
  email: string;
  role: "Admin" | "User";
}

export interface Post {
  authorId: number;
  author: Author;
  content: string;
  createdAt: string;
  id: number;
  title: string;
  viewCount: number;
  _count: { loves: number };
  comments: Comment[];
}

interface PostResponse {
  post: Post;
}

export function ViewPost() {
  const commentBoxRef = useRef<HTMLTextAreaElement | null>(null);
  const viewCommentRef: React.RefObject<HTMLElement | null> = useRef(null);
  const { postid } = useParams();
  const [post, setPost] = useState<Post>();
  const { data, loading, error } = useFetch<PostResponse>(
    `/api/post/${postid}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const [commentAddedTrigger, setCommentAddedTrigger] = useState(0);

  const [postLoveNum, setPostLoveNum] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (data) {
      setPost(data.post);
      setComments(data.post.comments);
      setPostLoveNum(data.post._count.loves);
    }
  }, [data]);

  useEffect(() => {
    if (commentAddedTrigger > 0) {
      viewCommentRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [commentAddedTrigger]);

  if (error) {
    return (
      <Navigate
        to="/errorpage"
        state={{
          title: "OPPS WE GOT THE ERROR: 500",
          message: "Could not fetch the Post",
        }}
        replace //stops the user from hitting "back" and landing on a broken/errored page
      />
    );
  }
  if (loading || !post) {
    return <MySpinner />;
  }
  return (
    <div className="flex w-full flex-col gap-5 lg:w-4/5 lg:flex-row">
      <PostInteractToolBox
        commentBoxRef={commentBoxRef}
        post={post}
        setPostLoveNum={setPostLoveNum}
      />
      <section className="w-full min-w-0">
        <div className="prose prose-headings:dark:text-white dark:prose-invert prose-p:text-base sm:prose-p:text-xl prose-pre:max-h-120 mx-auto flex w-full max-w-full flex-col bg-gray-200 p-4 leading-relaxed sm:p-6 dark:bg-gray-900 dark:text-white">
          <h1 className="w-full">{post.title}</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <HeartFilledIcon color="green" /> {postLoveNum}
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon color="green" /> {iso8061DateParser(post.createdAt)}
            </div>
          </div>
          <section>
            <Markdown
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </Markdown>
            <div className="flex flex-row items-center justify-between">
              <AuthorCard />{" "}
              <LovePost
                post={post}
                setPostLoveNum={setPostLoveNum}
                size="4"
                color="orange"
              />
            </div>
          </section>
        </div>
        <AddComment
          postId={post.id}
          setComments={setComments}
          commentBoxRef={commentBoxRef}
          onCommentAdded={() => setCommentAddedTrigger((n) => n + 1)}
        />
        <ViewComments
          viewCommentRef={viewCommentRef}
          comments={comments}
          setComments={setComments}
        />
      </section>
    </div>
  );
}
