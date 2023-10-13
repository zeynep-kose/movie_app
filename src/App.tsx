import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Home />
          <RouterProvider router={routes} />
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
