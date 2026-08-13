import { createBrowserRouter } from "react-router";
import App from "./App";
import { LoginPage } from "./pages/Login";
import { Home } from "./pages/Home";
import ErrorPage from "./pages/Error";
import { NewPost } from "./pages/NewPost";
import { EditPost } from "./pages/EditPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <ErrorPage />,
        path: "/error",
      },
      { element: <NewPost />, path: "/new" },
      { element: <EditPost />, path: "/edit/:postId" },
    ],
  },
]);
