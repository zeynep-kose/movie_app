import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import DetailMovies from "./pages/DetailMovies";
import DetailSeries from "./pages/DetailSeries";
import TvSeriesPage from "./pages/TvSeriesPage";
import UpcomingPage from "./pages/UpcomingPage";
import ThemeProvider from "./theme/themeProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <div className="app">
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Home />} /> {/* Ana sayfa */}s
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/details/:type/:id" element={<DetailMovies />} />
                <Route path="/detail/:tv/:id" element={<DetailSeries />} />
                <Route path="/tvSeries" element={<TvSeriesPage />} />
                <Route path="/upcoming" element={<UpcomingPage />} />
              </Routes>
            </Router>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
