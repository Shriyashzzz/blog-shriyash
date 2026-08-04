import { createBrowserRouter } from "react-router";
import App from "./App";
import { AllPostContainer } from "./components/AllPostContainer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <AllPostContainer /> }],
  },
]);
