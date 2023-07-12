import React, { useState } from "react";
import Switch from "./Switch/Switch";

function SearchForm (props) {
  const [movie, setMovie] = useState('');

  const handleMovieChange = (e) => {
    setMovie(e.target.value);
  }

  const handleSearchClick = (e) => {
    // описываем функционал при нажатии поиска
  }

  return (
    <section className="search-form">
      <div className="search-form__search-container">
        <input onChange={handleMovieChange} value={movie} placeholder="Фильм" className="search-form__input" />
        <button onClick={handleSearchClick} className="search-form__search-button" />
      </div>
      <div className="search-form__toggle-container">
        <Switch />
        <span className="search-form__span">Короткометражка</span>
      </div>
    </section>
  );
};

export default SearchForm;