import React, { useState } from "react";

function MoviesCard ({ movie, onSaveClick, onDeleteClick, setErrorPopupOpen, setErrorText }) {
  const [isAdded, setAdded] = useState(movie.isAdded);

  async function buttonClick() {
    try {
      if (!isAdded) {
        await onSaveClick(movie);
        setAdded(true);
      } else {
        await onDeleteClick(movie);
        setAdded(false);
      }
    } catch (err) {
      setErrorPopupOpen(true);
      setErrorText(`Ошибка ${err}`);
      console.log(err);
    }
    // if (!isAdded) {
    //   onSaveClick(movie);
    //   setAdded(true);
    // } else {
    //   setAdded(false);
    //   onDeleteClick(movie);
    // }
  }

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours > 0) {
      return `${hours} ч ${minutes} мин`;
    }
    return `${minutes} мин`;
  }

  const formattedDuration = formatDuration(movie.duration);

  return (
    <article className="card">
      <div className="card__data">
        <h2 className="card__title">{movie.nameRU}</h2>
        <p className="card__duration">{formattedDuration}</p>
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
