import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/Auth";
import { SearchContextProvider } from "./context/Search";
import { QueryClientProvider, QueryClient } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
