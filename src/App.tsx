import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Home />} /> {/* Ana sayfa */}
            </Routes>
          </Router>

          <RouterProvider router={routes} />
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
