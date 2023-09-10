import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Settings from "./Settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {document.querySelector("#JsonSettings") ? <Settings /> : <App />}
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  </React.StrictMode>
);
