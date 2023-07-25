import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import moviesApi from '../../utils/MoviesApi';
import mainApi from "../../utils/MainApi";

function Movies (props) {
  const [isLoading, setLoading] = useState(false);
  const [toggleShorts, setToggleShorts] = useState(false);
  const [isHeaderDark, setHeaderDark] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const cards = localStorage.getItem('filtered-movies');
    setCards(cards);
  }, []);

  // нажатие на кнопку короткометражки
  const handleToggleClick = () => {
    setToggleShorts(!toggleShorts);
  }

  // фильтрация фильмов на короткометражки
  function filterByShorts(movies) {
    return toggleShorts ? movies.filter((movie) => movie.duration <= 40) : movies;
  }

  // Submit кнопки поиска
  function handleSearchSubmit(movie) {
    setLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        const key = new RegExp(movie, "gi");
        // Сортируем все фильмы на наличие запроса поиска
        const sortedMovies = movies.filter(
          (item) => key.test(item.nameRU) || key.test(item.nameEN)
        );
        // Теперь фильтруем найденные фильмы на короткометражки
        const filteredMovies = filterByShorts(sortedMovies);
        localStorage.setItem('filtered-movies', filteredMovies);
        // Если фильмов нет, то мы передаем пустой массив.
        // Это необходимо, чтобы в MoviesCardList отобразилась
        // надпись "Ничего не найдено"
        if (filteredMovies.length === 0) {
          setLoading(false);
          setCards([]);
        } else {
          setLoading(false);
          setCards(filteredMovies);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setErrorText('Во время запроса произошла ошибка');
        props.openErrorPopup(true);
      });
  };

  return (
    <div className="page">
      <Header
        isHeaderDark={isHeaderDark}
        onBurgerMenuClick={props.onBurgerMenuClick} 
        loggedIn={props.loggedIn} 
      />
      <main className="main">
        <section className="movies">
          <SearchForm
            toggleShorts={toggleShorts}
            onToggleClick={handleToggleClick}
            onSubmit={handleSearchSubmit}
          />
          <MoviesCardList
            cards={cards}
            isLoading={isLoading}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Movies;