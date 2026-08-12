import { Button } from "@radix-ui/themes";
import { Container } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router";

export function MenuBar() {
  const navigate = useNavigate();
  const onNewPost = () => {
    navigate("/new", { viewTransition: true });
  };

  return (
    <Container justifySelf={"center"} className="w-full mb-5">
      {" "}
      <div className="flex w-full justify-center items-center gap-2">
        <p>What's on your mind today?</p>
        <Button onClick={onNewPost} color="red" style={{ cursor: "pointer" }}>
          {" "}
          New Post <Pencil2Icon />
        </Button>
      </div>
    </Container>
  );
}
