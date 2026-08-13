import { TextField } from "@radix-ui/themes";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { Ref } from "react";
interface Props {
  titleRef: Ref<HTMLInputElement>;
}

export function TitleTextField({ titleRef }: Props) {
  return (
    <TextField.Root
      ref={titleRef}
      placeholder="Title"
      style={{
        fontSize: "2rem",
        height: "4rem",
        fontWeight: "bold",
      }}
      className=" w-full placeholder:text-white h-full dark:bg-gray-900 "
    >
      <TextField.Slot>
        <CaretRightIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
}
