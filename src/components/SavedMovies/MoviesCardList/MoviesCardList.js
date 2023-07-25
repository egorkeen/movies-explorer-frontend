import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";
 
function MoviesCardList (props) {
  const [isLoading, setLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState(12); // Количество карточек для отображения

  // Функция для загрузки следующих карточек
function loadMoreCards() {
  // При клике на кнопку "Ещё" определяем, сколько карточек нужно добавить в зависимости от ширины экрана
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1280) {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3)
  } else if (screenWidth >= 768 && screenWidth < 1280) {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 2);
  } else if (screenWidth >= 320 && screenWidth < 768) {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 2);
  }
};

  // Добавим useEffect для обработки события isLoading, чтобы при каждом изменении этого состояния обновлять количество видимых карточек
  useEffect(() => {
    setVisibleCards(12); // Вернем количество карточек к изначальному значению после загрузки новых данных
  }, [props.isLoading]);

  // Добавим слушатель события изменения размера окна
  useEffect(() => {
    function handleResize() {
      // При изменении размера окна также пересчитываем количество карточек для отображения
      const screenWidth = window.innerWidth;
      if (screenWidth >= 768 && screenWidth < 1280) {
        setVisibleCards(8);
      } else if (screenWidth >= 320 && screenWidth < 768) {
        setVisibleCards(5);
      }
    }

    window.addEventListener("resize", handleResize);

    // Удаляем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="saved-movies__card-list">
      {props.isLoading ? (
        <Preloader />
      ) : (
        // Проверяем, если массив найденных фильмов не пустой, то рендерим
        // то, что было найдено.
        props.cards.length > 0 ? 
        <div className="saved-movies__container">
          {props.cards.slice(0, visibleCards).map((card) => (
            <MoviesCard
              key={card._id}
              card={card}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </div>
        // Если массив пустой, то рендерим надпись ниже
        :
        <h2 className="saved-movies__no-movies-title">Здесь пока пусто</h2>
      )}
      {/* Показываем кнопку "Ещё" только если остались еще карточки для отображения */}
      {props.cards.length > visibleCards && !props.isLoading && (
        <button onClick={loadMoreCards} className="saved-movies__load-button">
          Ещё
        </button>
      )}
    </div>
  );
};

export default MoviesCardList;