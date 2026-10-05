import { Button } from "@radix-ui/themes";
import { Container } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router";

type Props = {
  ButtonText: string;
  OnClickNav: string;
  BtnColor: any;
};

export function MenuBar({ ButtonText, OnClickNav, BtnColor }: Props) {
  const navigate = useNavigate();
  const onNewPost = () => {
    navigate(OnClickNav, { viewTransition: true });
  };

  return (
    <Container justifySelf={"center"} className="w-full mb-5">
      {" "}
      <div className="flex w-full justify-center items-center gap-2">
        <p className="font-extrabold text-xl ">What's on your mind today?</p>
        <Button
          onClick={onNewPost}
          color={BtnColor}
          style={{ cursor: "pointer" }}
        >
          {" "}
          {ButtonText} <Pencil2Icon />
        </Button>
      </div>
    </Container>
  );
}
