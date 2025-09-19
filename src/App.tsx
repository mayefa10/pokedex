
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/features/header/Header";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
