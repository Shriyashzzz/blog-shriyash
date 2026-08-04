import "./index.css";
import { router } from "./router.tsx";
import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
