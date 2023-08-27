import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Switch from "./Switch/Switch";

function SearchForm ({ onToggleClick, onSubmit, shortsActive }) {
  const [movie, setMovie] = useState('');
  const location = useLocation();

  const handleMovieChange = (e) => {
    setMovie(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === '/movies') {
      localStorage.setItem('inputMoviesValue', JSON.stringify(movie));
    }
    onSubmit(movie);
  }

  // подставляем в инпут значение из локального хранилища
  useEffect(() => {
    if (location.pathname === '/movies') {
      const inputValue = JSON.parse(localStorage.getItem('inputMoviesValue')) || '';
      setMovie(inputValue);
    }
  }, [location.pathname]);

  return (
    <section className="search-form">
      <form onSubmit={handleSearchSubmit} className="search-form__search-container">
        <input
          type="text"
          placeholder="Фильм" 
          className="search-form__input"
          minLength={2}
          maxLength={40}
          required={true}
          onChange={handleMovieChange} 
          value={movie} 
        />
        <button 
          type="submit" 
          className="search-form__search-button" 
        />
      </form>
      <div className="search-form__toggle-container">
        <Switch
          shortsActive={shortsActive}
          onToggleClick={onToggleClick}
        />
        <span className="search-form__span">Короткометражка</span>
      </div>
    </section>
  );
};

export default SearchForm;