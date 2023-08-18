import React from "react";

function MoviesCard ({ movie, onDeleteClick }) {

  function handleDeleteClick() {
    onDeleteClick(movie);
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
          alt={movie.name} 
          src={movie.image} 
        />
      </a>
      <button className='card__delete-button' onClick={handleDeleteClick} />
    </article>
  );
};

export default MoviesCard;