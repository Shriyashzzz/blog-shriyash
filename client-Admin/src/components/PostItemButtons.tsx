import { Button } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
interface Props {
  post: Post;
}

export function PostItemButton({ post }: Props) {
  return (
    <div className="flex  items-center ">
      <Button color="red" style={{ cursor: "pointer" }}>
        Edit Post
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
