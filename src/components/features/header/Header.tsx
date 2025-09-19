import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFilters } from '../../../context/useFilters';
import InputSearch from '../InputSearch';
import SortButton from '../SortButton';
import TypeFilter from '../TypeFilter';
import './Header.css';
import pokemonBall from '../../../img/pokeball.png';

const Header: React.FC = () => {
  const location = useLocation();
  const { searchTerm, setSearchTerm } = useFilters();
  const isHomePage = location.pathname === '/';

  return (
    <header className="app-header slide-in-up">
      <div className="container">
        <div className="header-content">
          {/* Logo and Title */}
          <div className="brand">
            <Link to="/" className="brand-link">
              <div className="logo-container">
                <img
                  src={pokemonBall}
                  alt="Pokéball"
                  className="pokeball-logo pulse"
                />
              </div>
              <h1 className="app-title">Pokédex</h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="nav-menu">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              🏠 Home
            </Link>
            <Link
              to="/favorites"
              className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
            >
              ⭐ Favorites
            </Link>
          </nav>

          {/* Search and Controls - Only on Home page */}
          {isHomePage && (
            <div className="search-controls">
              <div className="search-wrapper">
                <InputSearch
                  value={searchTerm}
                  onChange={setSearchTerm}
                />
              </div>
              <TypeFilter />
              <SortButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;