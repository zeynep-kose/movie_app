import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyContext from "./context/Context";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import DetailMovies from "./pages/DetailMovies";
import TvSeriesPage from "./pages/TvSeriesPage";
import { MyContextProvider } from "./context/Context";
import UpcomingPage from "./pages/UpcomingPage";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const queryClient = new QueryClient();

function App() {
  i18next.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          // İngilizce çeviri metinleri burada
        },
      },
      tr: {
        translation: {
          // Türkçe çeviri metinleri burada
        },
      },
      // Diğer diller...
    },
    lng: "en", // Varsayılan dil
  });

  return (
    <HelmetProvider>
      <MyContextProvider>
        <QueryClientProvider client={queryClient}>
          <div className="app">
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Home />} /> {/* Ana sayfa */}
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/details/:id" element={<DetailMovies />} />
                <Route path="/tvSeries" element={<TvSeriesPage />} />
                <Route path="/upcoming" element={<UpcomingPage />} />
              </Routes>
            </Router>
          </div>
        </QueryClientProvider>
      </MyContextProvider>
    </HelmetProvider>
  );
}

export default App;
