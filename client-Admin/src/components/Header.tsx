import terminal from "../assets/terminal.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { isAuth } from "../store/authSlice";
import { UserType } from "../vite.env";

interface CheckAuthResposne {
  message: string;
  user: UserType;
}

export function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.value);
  console.log(auth.isAuthenticated);

  useEffect(() => {
    const getInitialAuthState = async () => {
      const response = await fetch("/api/auth/me/admin", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) return;
      const data: CheckAuthResposne = await response.json();
      console.log(data);
      dispatch(isAuth(data.user));
    };

    getInitialAuthState();
  }, []);

  return (
    <header className="flex w-full flex-row items-center justify-between border-b-2 border-green-800 px-6 py-2">
      <NavLink
        to="/"
        viewTransition={true}
        className="flex flex-row items-center gap-2"
      >
        <img src={terminal} alt="blog logo" className="size-10" />
        <p className="m-0 p-0 font-[Nabla] text-sm text-green-600 sm:text-xl">
          &lt;Shriyash Uncompiled / &gt;
        </p>
      </NavLink>

      <div className="flex items-center justify-center gap-4">
        {auth && !auth.isAuthenticated && (
          <ul>
            <NavLink className="cursor-pointer" to="/login">
              <p className="font-bold text-green-800 dark:text-green-600">
                Log In
              </p>
            </NavLink>
          </ul>
        )}
        {auth && <p>Log out</p>}
      </div>
    </header>
  );
}
