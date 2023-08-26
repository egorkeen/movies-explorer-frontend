import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

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
  currentUser,
  setErrorPopupOpen,
  setErrorText
  }) {

  const isHeaderDark = true;

  useEffect(() => {
    if (currentUser) {
      setLoadingSavedMovies(true);
      const userMovies = JSON.parse(localStorage.getItem('savedMovies'));
      setSavedMovies(userMovies);
      setLoadingSavedMovies(false);
    }
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
            setErrorPopupOpen={setErrorPopupOpen}
            setErrorText={setErrorText}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SavedMovies;