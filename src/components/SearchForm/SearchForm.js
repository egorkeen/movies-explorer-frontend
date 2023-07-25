import React, { useState } from "react";
import Switch from "./Switch/Switch";

function SearchForm (props) {
  const [movie, setMovie] = useState('');

  const handleMovieChange = (e) => {
    setMovie(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(movie);
  }

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
          toggleShorts={props.toggleShorts}
          onToggleClick={props.onToggleClick}
        />
        <span className="search-form__span">Короткометражка</span>
      </div>
    </section>
  );
};

export default SearchForm;