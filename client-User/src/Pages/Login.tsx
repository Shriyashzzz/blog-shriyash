import { Form, useNavigate } from "react-router";
import blogLogo from "../assets/icons/terminal.svg";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { isAuth, isNotAuth } from "../store/authSlice";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Link } from "react-router";

interface UserRequestBody {
  email: string;
  password: string;
}

export function LoginPage() {
  const [invalidMesasge, setInvalidMessage] = useState<string>("");
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.value);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!emailRef.current || !passRef.current) {
      return;
    }
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const userReqBody: UserRequestBody = { email: email, password: password };
    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userReqBody),
    });

    console.log(response);
    if (!response.ok) {
      if (auth) dispatch(isNotAuth());
      const data = await response.json();
      setInvalidMessage(data.message);
    } else {
      if (!auth) {
        dispatch(isAuth());
      }
      navigate("/", { viewTransition: true });
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 text-black lg:px-8 dark:text-amber-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src={blogLogo}
          alt="Shriyash Uncomiled!"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form onSubmit={(e) => onSubmit(e)} className="space-y-6">
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
          <p className="text-red-500">{invalidMesasge}</p>
          <div className="text-sm">
            <Link
              to="/signup"
              viewTransition={true}
              className="font-semibold hover:text-green-600"
            >
              Sign Up?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
