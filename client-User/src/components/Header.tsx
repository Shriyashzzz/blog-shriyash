import terminal from "../assets/icons/terminal.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Switch } from "@radix-ui/themes";
import { switchTheme } from "../store/themeSlice";
import { MoonIcon } from "@radix-ui/react-icons";

export function Header() {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();
  return (
    <header className="flex w-full flex-row items-center justify-between border-b-2 border-green-800 px-6 py-2">
      <div className="flex flex-row items-center gap-2">
        <img src={terminal} alt="blog logo" />
        <p className="m-0 p-0 font-[Nabla] text-sm text-green-600 sm:text-xl">
          &lt;Shriyash Uncompiled / &gt;
        </p>
      </div>
      <div className="flex flex-row items-center gap-3">
        <Switch
          size="3"
          checked={theme === "dark"}
          onCheckedChange={() => dispatch(switchTheme())}
        />
        <MoonIcon className="size-6" />
      </div>
    </header>
  );
}
