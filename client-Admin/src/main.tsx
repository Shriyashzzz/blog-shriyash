import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes.tsx";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router/dom";
import store from "./store/store.ts";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
