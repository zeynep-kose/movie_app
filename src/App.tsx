import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
function App() {
  return (
    <HelmetProvider>
      <div className="app">
        <Home />
      </div>
    </HelmetProvider>
  );
}

export default App;
