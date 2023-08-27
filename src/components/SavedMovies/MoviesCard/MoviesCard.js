import React from "react";

function MoviesCard ({ movie, onDeleteClick, setErrorPopupOpen, setErrorText }) {

  async function handleDeleteClick() {
    try {
      await onDeleteClick(movie);
    } catch (err) {
      setErrorPopupOpen(true);
      setErrorText(`Ошибка ${err}`);
      console.log(err);
    }
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
          alt={movie.name} 
          src={movie.image} 
        />
      </a>
      <button className='card__delete-button' onClick={handleDeleteClick} />
    </article>
  );
};

export default MoviesCard;
