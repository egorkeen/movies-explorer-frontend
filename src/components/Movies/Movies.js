import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

import mainApi from "../../utils/MainApi";

function Movies ({ 
  onBurgerMenuClick, 
  loggedIn, 
  movies, 
  onSaveClick,
  onDeleteClick,
  isLoading,
  onSubmit,
  onToggleClick,
  shortsActive,
  setErrorPopupOpen,
  setErrorText
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
        <section className="movies">
          <SearchForm
            onToggleClick={onToggleClick}
            onSubmit={onSubmit}
            shortsActive={shortsActive}
          />
          <MoviesCardList
            movies={movies}
            isLoading={isLoading}
            onSaveClick={onSaveClick}
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

export default Movies;