import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "./styles/app.css";
import Settings from "./settings/Settings";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ErrorBoundary } from "react-error-boundary";
import api from "@codythatsme/caus-api";
import { FatalErrorFallback } from "@codythatsme/smart-suite-components";
import SettingsProvider from "./settings/settingsContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err) => {
      console.log(err);
      if (err instanceof Error) {
        api.post.standalone("causeis_error", {
          ErrorName: err.name,
          ErrorMessage: err.message.substring(0, 4000),
          ProductName: "PRODUCT",
          IPart: "IPART",
        });
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<FatalErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        {document.querySelector("#JsonSettings") ? (
          <Settings />
        ) : (
          <SettingsProvider>
            <App />
          </SettingsProvider>
        )}
        <Toaster richColors />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
