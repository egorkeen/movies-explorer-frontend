import React, { useState } from "react";

function MoviesCard ({ movie, onSaveClick }) {
  // тут описываем логику состояния карточки. 
  // пока поставим false по умолчанию
  const [isAdded, setAdded] = useState(movie.isAdded);

  function buttonClick() {
    if (!isAdded) {
      onSaveClick(movie);
      setAdded(true);
    }
  }

  return (
    <article className="card">
      <div className="card__data">
        <h2 className="card__title">{movie.nameRU}</h2>
        <p className="card__duration">{movie.duration} мин</p>
      </div>
      <a target="_blank" href={movie.trailerLink} rel="noreferrer">
        <img 
          className="card__image" 
          alt={movie.nameRU} 
          src={`https://api.nomoreparties.co${movie.image.url}`} />
      </a>
      <button className={`${isAdded ? 'card__add-button_active' : 'card__add-button'}`} onClick={buttonClick}>
       {isAdded ? '' : 'Сохранить'}
      </button>
    </article>
  );
};

export default MoviesCard;