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
import { FatalErrorFallback } from "@codythatsme/smart-suite-components";
import SettingsProvider from "./settings/settingsContext";
import { writeIpartError } from "@codythatsme/causeis-utils";
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
        if (import.meta.env.PROD) {
          writeIpartError({
            Message: err.message,
            Product: "Smart Classifieds",
            IPart: "Smart Classifieds Editor",
          });
        }
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
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
