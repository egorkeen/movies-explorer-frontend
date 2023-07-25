import React, { useState } from "react";

function MoviesCard (props) {
  // тут описываем логику состояния карточки. 
  // пока поставим false по умолчанию
  const [isAdded, setAdded] = useState(false);

  function buttonClick() {
    if (!isAdded) {
      props.onSaveClick(props.card);
      setAdded(true);
    } else {
      props.onDeleteClick(props.card.movieId);
      setAdded(false);
    }
  }

  return (
    <article className="card">
      <div className="card__data">
        <h2 className="card__title">{props.card.nameRU}</h2>
        <p className="card__duration">{props.card.duration} мин</p>
      </div>
      <a target="_blank" href={props.card.trailerLink} rel="noreferrer">
        <img 
          className="card__image" 
          alt={props.card.name} 
          src={`https://api.nomoreparties.co${props.card.image.url}`} />
      </a>
      <button className={`card__add-button ${isAdded ? 'card__add-button_active' : ''}`} onClick={buttonClick}>
       {isAdded ? '' : 'Сохранить'}
      </button>
    </article>
  );
};

export default MoviesCard;