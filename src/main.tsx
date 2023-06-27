import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Settings from "./Settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

if (document.getElementById("JsonSettings")) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Settings />
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          position="bottom-right"
          containerStyle={{
            zIndex: 10000000,
            top: 250,
          }}
        />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
