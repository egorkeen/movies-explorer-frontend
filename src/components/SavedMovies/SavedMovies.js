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