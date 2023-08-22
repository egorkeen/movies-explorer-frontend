import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

import mainApi from "../../utils/MainApi";

function SavedMovies ({ 
  onBurgerMenuClick, 
  loggedIn, 
  savedMovies, 
  onDeleteClick,
  isLoading,
  setLoadingSavedMovies,
  onSubmit,
  onToggleClick,
  shortsActive,
  setSavedMovies,
  currentUser
  }) {

  const isHeaderDark = true;

  useEffect(() => {
    setLoadingSavedMovies(true);
    mainApi
      .getMovies()
      .then((movies) => {
        // сделав запрос, фильтруем фильмы по владельцу
        const userMovies = movies.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(userMovies);
        setLoadingSavedMovies(false);
      })
      .catch((err) => {
        console.log(err);
      })
}, []);

  return (
    <div className="page">
      <Header
        isHeaderDark={isHeaderDark}
        onBurgerMenuClick={onBurgerMenuClick} 
        loggedIn={loggedIn} 
      />
      <main className="main">
        <section className="saved-movies">
          <SearchForm
            shortsActive={shortsActive}
            onToggleClick={onToggleClick}
            onSubmit={onSubmit}
          />
          <MoviesCardList
            isLoading={isLoading}
            movies={savedMovies}
            onDeleteClick={onDeleteClick}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SavedMovies;