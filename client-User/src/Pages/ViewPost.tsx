import { useParams } from "react-router";

export function ViewPost() {
  const { postId } = useParams();
  console.log(postId);
  return <>{postId}</>;
}
