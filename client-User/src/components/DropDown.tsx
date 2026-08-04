import { DropdownMenu } from "radix-ui";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export const DropDown = () => {
  const handleLogout = () => {};

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md bg-white p-[5px] text-gray-700 shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={handleLogout}
            onSelect={handleLogout}
            className="group relative flex h-[25px] cursor-pointer items-center rounded-[3px] pr-[5px] pl-[25px] text-[13px] leading-none outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[highlighted]:bg-green-600 data-[highlighted]:text-white"
          >
            Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
