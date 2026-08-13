import terminal from "../assets/terminal.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { isAuth, isNotAuth } from "../store/authSlice";
import { UserType } from "../vite-env";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router";

interface CheckAuthResposne {
  message: string;
  user: UserType;
}

export function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getInitialAuthState = async () => {
      const response = await fetch("/api/auth/me/admin", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) return;
      const data: CheckAuthResposne = await response.json();
      dispatch(isAuth(data.user));
    };

    getInitialAuthState();
  }, []);

  const logOutAdmin = async () => {
    if (!auth) return;
    try {
      const response = await fetch("/api/auth/logout", {
        credentials: "include",
        method: "DELETE",
      });
      if (!response.ok) {
        navigate("/error", {
          state: {
            title: "Error",
            message: "Unable to Log out, bad server response ",
          },
        });
        return;
      }
      dispatch(isNotAuth());
      navigate("/login", { viewTransition: true });
    } catch (e) {
      navigate("/error", {
        state: {
          title: "CLient-Admin Error",
          message: "Unable to Log out, bad client-admin error",
        },
      });
      return;
    }
  };

  return (
    <header className="flex w-full flex-row items-center justify-between border-b-2 border-green-800 px-6 py-2">
      <NavLink
        to="/"
        viewTransition={true}
        className="flex flex-row items-center gap-2"
      >
        <img src={terminal} alt="blog logo" className="size-10" />
        <p className="m-0 p-0 font-[Nabla] text-sm  sm:text-xl text-green-600 sm:text-xl">
          &lt;Shriyash Uncompiled / &gt;{" "}
          <em className="text-sm dark:text-gray-400 ">admin</em>
        </p>
      </NavLink>

      <div className="flex items-center justify-center gap-4">
        {auth && !auth.isAuthenticated && (
          <ul>
            <NavLink className="cursor-pointer" to="/login">
              <Button color="green"> Log in</Button>
            </NavLink>
          </ul>
        )}
        {auth && auth.isAuthenticated && (
          <Button color="green" onClick={logOutAdmin}>
            {" "}
            Log Out
          </Button>
        )}
      </div>
    </header>
  );
}
