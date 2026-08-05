import { Form, useNavigate } from "react-router";
import blogLogo from "../assets/icons/terminal.svg";
import { useState, useRef } from "react";
import { Link } from "react-router";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

interface UserRequestBody {
  email: string;
  password: string;
  username: string;
  cpassword: string;
}

interface RequestError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export function SignUp() {
  const [invalidMessage, setInvalidMessage] = useState<string>("");
  const [errors, setErrors] = useState<Array<RequestError>>([]);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const cPassRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      !emailRef.current ||
      !passRef.current ||
      !usernameRef.current ||
      !cPassRef.current
    ) {
      setInvalidMessage("All fields must be populated!");
      return;
    }

    const userReqBody: UserRequestBody = {
      email: emailRef.current.value,
      password: passRef.current.value,
      username: usernameRef.current.value,
      cpassword: cPassRef.current.value,
    };
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userReqBody),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      setInvalidMessage(data.message);
      setErrors(data.errors);
    } else {
      navigate("/login", { viewTransition: true });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="mx-auto flex min-h-full flex-col justify-center px-6 py-12 text-black lg:px-8 dark:text-amber-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={blogLogo}
            alt="Shriyash Uncomiled!"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
            Create your new Account!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form onSubmit={(e) => onSubmit(e)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium">
                <p>Username</p>
              </label>
              <div className="mt-2">
                <input
                  ref={usernameRef}
                  id="username"
                  type="text"
                  name="username"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

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
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium"
                >
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="cpassword"
                  className="block text-sm/6 font-medium"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  ref={cPassRef}
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full cursor-pointer justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm/6 font-semibold hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </Form>
          <div className="flex flex-col items-center justify-center gap-2 pt-3">
            <div className="text-sm">
              <Link
                to="/login"
                viewTransition={true}
                className="font-semibold hover:text-green-600"
              >
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="group relative flex h-fit flex-col items-center justify-center">
        <p className="flex cursor-pointer flex-row items-center justify-center gap-1 text-red-500">
          {invalidMessage} <QuestionMarkCircledIcon color="green" />
        </p>
        {errors && errors.length > 0 && (
          <ul className="absolute bottom-full mb-2 hidden min-w-xl rounded bg-blue-400 p-4 text-white group-hover:block">
            {errors.map((err, idx) => (
              <li key={idx}>{err.msg}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
