import terminal from "../assets/icons/terminal.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { switchTheme } from "../store/themeSlice";
import { MoonIcon } from "@radix-ui/react-icons";
import { SunIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router";
export function Header() {
  const theme = useSelector((state: RootState) => state.theme.value || "light");
  const dispatch = useDispatch();
  return (
    <header className="flex w-full flex-row items-center justify-between border-b-2 border-green-800 px-6 py-2">
      <div className="flex flex-row items-center gap-2">
        <img src={terminal} alt="blog logo" className="size-10" />
        <p className="m-0 p-0 font-[Nabla] text-sm text-green-600 sm:text-xl">
          &lt;Shriyash Uncompiled / &gt;
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <ul>
          <NavLink className="cursor-pointer" to="/login">
            <p className="font-bold text-green-800 dark:text-green-600">
              Log In
            </p>
          </NavLink>
        </ul>
        <button
          onClick={() => dispatch(switchTheme())}
          className="flex cursor-pointer flex-row items-center gap-3 transition duration-300 ease-in-out hover:-translate-y-0.5"
        >
          {theme === "light" ? (
            <MoonIcon className="size-6" />
          ) : (
            <SunIcon className="size-6" />
          )}
        </button>
      </div>
    </header>
  );
}
