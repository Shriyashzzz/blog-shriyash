import { createBrowserRouter } from "react-router";
import App from "./App";
import { AllPostContainer } from "./components/AllPostContainer";
import { LoginPage } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import ErrorPage from "./Pages/Error";
import { ViewPost } from "./Pages/ViewPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AllPostContainer /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/errorpage", element: <ErrorPage /> },
      { path: "/viewpost/:postid", element: <ViewPost /> },
    ],
  },
]);
