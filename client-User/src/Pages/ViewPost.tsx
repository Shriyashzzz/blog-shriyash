import { useParams } from "react-router";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MySpinner } from "../components/MySpinner";

export interface Post {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  title: string;
  viewCount: number;
  _count: { loves: number };
}

interface PostResponse {
  post: Post;
}

export function ViewPost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<Post>();
  const { data, loading, error } = useFetch<PostResponse>(
    `/api/post/${postId}`,
  );
  useEffect(() => {
    if (data) setPost(data.post);
  }, [data]);

  if (error) {
    return navigate("/errorpage", {
      state: {
        title: "OPPS WE GOT THE ERROR: 500",
        message: "Could not fetch the Posts",
      },
    });
  }
  if (loading || !post) {
    return <MySpinner />;
  }

  return <>yo</>;
}
