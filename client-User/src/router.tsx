import { createBrowserRouter } from "react-router";
import App from "./App";
import { AllPostContainer } from "./components/AllPostContainer";
import { LoginPage } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AllPostContainer /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);
