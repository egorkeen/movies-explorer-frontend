import React, { useState } from "react";
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
  onSubmit,
  onToggleClick,
  shortsActive 
  }) {
  const [isHeaderDark, setHeaderDark] = useState(true);

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