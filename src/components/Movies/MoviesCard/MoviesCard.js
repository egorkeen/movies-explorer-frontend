import React, { useState } from "react";

function MoviesCard (props) {
  // тут описываем логику состояния карточки. 
  // пока поставим false по умолчанию
  const [isAdded, setAdded] = useState(false);

  function handleAddClick () {
  if (!isAdded) {
    // тут в дальнейшем нужно будет описать взаимодействие с api
    setAdded(true);
  } else {
    // тут тоже
    setAdded(false);
  }
  }

  return (
    <article className="card">
      <div className="card__data">
        <h2 className="card__title">{props.name}</h2>
        <p className="card__duration">{props.duration}</p>
      </div>
      <img className="card__image" alt={props.name} src={props.image} />
      <button className={`card__add-button ${isAdded ? 'card__add-button_active' : ''}`} onClick={handleAddClick}>
       {isAdded ? '' : 'Сохранить'}
      </button>
    </article>
  );
};

export default MoviesCard;