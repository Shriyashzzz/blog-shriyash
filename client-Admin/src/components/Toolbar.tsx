import { SegmentedControl } from "@radix-ui/themes";
import { useNavigate } from "react-router";

interface ToolBarProp {
  def: string;
}

export function ToolBar({ def }: ToolBarProp) {
  const naviagte = useNavigate();
  return (
    <SegmentedControl.Root
      defaultValue={def}
      radius="medium"
      size={"2"}
      className="mt-2 p-0 m-0 "
    >
      <SegmentedControl.Item
        value="Posts"
        onClick={() => naviagte("/")}
        style={{ cursor: "pointer" }}
      >
        Posts
      </SegmentedControl.Item>
      <SegmentedControl.Item
        value="Newsletters"
        onClick={() => naviagte("/home/newsletters")}
        style={{ cursor: "pointer" }}
      >
        NewsLetters
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
