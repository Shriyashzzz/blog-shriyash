import { TextField } from "@radix-ui/themes";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction } from "react";
interface Props {
  setTitle: Dispatch<SetStateAction<string>>;
  title?: string;
}

export function TitleTextField({ setTitle, title }: Props) {
  return (
    <TextField.Root
      value={title && title}
      placeholder="Title"
      style={{
        fontSize: "2rem",
        height: "4rem",
        fontWeight: "bold",
      }}
      onChange={(e) => setTitle(e.currentTarget.value)}
      className=" w-full placeholder:text-white h-full dark:bg-gray-900 "
    >
      <TextField.Slot>
        <CaretRightIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
}
