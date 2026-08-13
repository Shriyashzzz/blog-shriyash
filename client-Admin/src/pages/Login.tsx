import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-router";
import blogLogo from "../assets/terminal.svg";
import { isAuth } from "../store/authSlice";
import { LoginPageCallOut } from "../components/LoginPageCallout";
interface AdminRequestBody {
  email: string;
  password: string;
}

export function LoginPage() {
  const auth = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [invalidMessage, setInvalidMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
      return;
    }
  }, [auth]);

  const formOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!emailRef.current || !passRef.current) {
      return;
    }
    const adminReqBody: AdminRequestBody = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    const response = await fetch("/api/auth/admin/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(adminReqBody),
    });
    // if invalid login
    if (!response.ok) {
      setInvalidMessage("Invalid email or username");
      return;
    }
    // if valid login
    const data = await response.json();
    dispatch(isAuth(data.user));
    return;
  };

  return (
    <div className="flex min-h-full flex-col  px-6 py-12 text-black lg:px-8 dark:text-amber-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Sign in to your account
        </h2>
      </div>
      <LoginPageCallOut />
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form onSubmit={(e) => formOnSubmit(e)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium">
              <p>Email address</p>
            </label>
            <div className="mt-2">
              <input
                ref={emailRef}
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                ref={passRef}
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full cursor-pointer justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm/6 font-semibold hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign in
            </button>
          </div>
        </Form>
        <div className="flex flex-col items-center justify-center gap-2 pt-3">
          <p className="text-red-500">{invalidMessage}</p>
        </div>
      </div>
    </div>
  );
}
