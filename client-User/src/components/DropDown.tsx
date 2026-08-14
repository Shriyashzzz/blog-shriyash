import { DropdownMenu } from "radix-ui";
import { useDispatch } from "react-redux";
import { isNotAuth } from "../store/authSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { initialExtract } from "../utils/initialExtractor";
import { Avatar } from "@radix-ui/themes";
import AuthorIocn from "../assets/icons/authorIcon.jpg";

export const DropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.value);
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
          className="dark:hover:bg-gray-7 00 inline-flex size-8.75 cursor-pointer items-center justify-center rounded-full text-black shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Options"
        >
          <Avatar
            size="3"
            radius="full"
            className="border *:border-gray-300"
            src={
              auth.user && auth.user.role == "Admin"
                ? AuthorIocn
                : "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHlwZTJiNTc1cHBzejdpZGU2NWtpZ2xnM2hoM3JhdjdkczRkdDFmNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QxZEtFE02ofY00gJ71/giphy.gif"
            }
            fallback={(auth.user && initialExtract(auth.user.username)) || "Hi"}
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
