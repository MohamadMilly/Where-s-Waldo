import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrentUserProvider } from "./providers/CurrentUserProvider.tsx";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CurrentUserProvider>
        <RouterProvider router={router} />
      </CurrentUserProvider>
    </QueryClientProvider>
  </StrictMode>,
);
