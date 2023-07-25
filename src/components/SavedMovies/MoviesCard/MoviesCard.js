import React, { useState } from "react";
import mainApi from "../../../utils/MainApi";

function MoviesCard (props) {

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <div className="card__data">
        <h2 className="card__title">{props.card.nameRU}</h2>
        <p className="card__duration">{props.card.duration} мин</p>
      </div>
      <img className="card__image" alt={props.card.name} src={props.card.image} />
      <button className='card__delete-button' onClick={handleDeleteClick} />
    </article>
  );
};

export default MoviesCard;