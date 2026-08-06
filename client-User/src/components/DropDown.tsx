import { DropdownMenu } from "radix-ui";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { isNotAuth } from "../store/authSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { initialExtract } from "../utils/initialExtractor";
import { Avatar } from "@radix-ui/themes";

export const DropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.value.user);
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        credentials: "include",
        method: "DELETE",
      });

      if (response.ok) {
        dispatch(isNotAuth());
        return;
      }

      const data = await response.json().catch(() => null);
      navigate("/errorpage", {
        state: { title: "Oops!", message: data?.message ?? "Logout failed" },
      });
    } catch (e: unknown) {
      navigate("/errorpage", {
        state: { title: "Oops!", message: "Something went wrong" },
      });
    }
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex size-8.75 cursor-pointer items-center justify-center rounded-full text-black shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-black dark:hover:bg-gray-700"
          aria-label="Options"
        >
          <Avatar
            size="3"
            radius="full"
            className="border *:border-gray-300"
            src={
              user!.role == "Admin"
                ? "https://scontent-sjc6-1.xx.fbcdn.net/v/t39.30808-6/684262166_26612009511790748_2315032028178435336_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=r-iOFVaVBREQ7kNvwFSiHTI&_nc_oc=AdpxCQ2Llo91ug6hX1E0jvPx8aewLeH0Tlu3LnDlkU9xTrydym602IztwBsgqyalqvJ8onM8GYXlHsFyhm6jXfE6&_nc_zt=23&_nc_ht=scontent-sjc6-1.xx&_nc_gid=_tntilGb5NTS23LVOdpo8g&_nc_ss=7b2a8&oh=00_AQG1oDZtmr36czaM4cRjECG2Ezr0wgNiTBQJ8W8uSMkSqw&oe=6A78F759"
                : undefined
            }
            fallback={initialExtract(user!.username)}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-55 rounded-md bg-white p-1.25 text-gray-700 shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] will-change-[opacity,transform] data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={handleLogout}
            className="group relative flex h-6.25 cursor-pointer items-center rounded-[3px] pr-1.25 pl-6.25 text-[13px] leading-none outline-none select-none data-disabled:pointer-events-none data-disabled:text-gray-400 data-highlighted:bg-green-600 data-highlighted:text-white"
          >
            Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
