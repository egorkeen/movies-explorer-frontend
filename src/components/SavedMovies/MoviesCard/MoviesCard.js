import React, { useState } from "react";

function MoviesCard (props) {
  
  function handleDeleteClick () {
    // описываем логику удаления карточки
  }

  return (
    <article className="card">
      <div className="card__data">
        <h2 className="card__title">{props.name}</h2>
        <p className="card__duration">{props.duration}</p>
      </div>
      <img className="card__image" alt={props.name} src={props.image} />
      <button className='card__delete-button' onClick={handleDeleteClick} />
    </article>
  );
};

export default MoviesCard;