import { SegmentedControl } from "@radix-ui/themes";
import { useNavigate } from "react-router";

interface ToolBarProp {
  def: string;
}

export function ToolBar({ def }: ToolBarProp) {
  const naviagte = useNavigate();
  return (
    <SegmentedControl.Root defaultValue={def} radius="medium">
      <SegmentedControl.Item
        value="Home"
        onClick={() => naviagte("/")}
        style={{ cursor: "pointer" }}
      >
        Home
      </SegmentedControl.Item>
      <SegmentedControl.Item
        value="About"
        onClick={() => naviagte("/about")}
        style={{ cursor: "pointer" }}
      >
        About
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
