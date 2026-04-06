import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.css";
import { routes } from "./routes/routes.jsx";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
