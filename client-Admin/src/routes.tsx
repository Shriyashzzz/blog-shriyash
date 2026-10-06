import { createBrowserRouter } from "react-router";
import App from "./App";
import { LoginPage } from "./pages/Login";
import { Posts } from "./pages/Posts";
import ErrorPage from "./pages/Error";
import { NewPost } from "./pages/NewPost";
import { EditPost } from "./pages/EditPost";
import { NewNewsLetter } from "./pages/NewNewsletter";
import { Newsletters } from "./pages/Newsletters";
import { EditNewsLetter } from "./pages/EditNewsLetter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Posts /> },
      { element: <Newsletters />, path: "/home/newsletters" },
      {
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <ErrorPage />,
        path: "/error",
      },
      { element: <NewPost />, path: "/new/post" },
      { element: <EditPost />, path: "/edit/:postId" },
      { element: <NewNewsLetter />, path: "/new/newsletter" },
      { element: <EditNewsLetter />, path: "/edit/newsletter/:letterId" },
    ],
  },
]);
