import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies (props) {
  const [isHeaderDark, setHeaderDark] = useState(true);

  return (
    <div className="page">
      <Header
        isHeaderDark={isHeaderDark}
        onBurgerMenuClick={props.onBurgerMenuClick} 
        isLoggedIn={props.isLoggedIn} 
      />
      <main className="main">
        <section className="movies">
          <SearchForm />
          <MoviesCardList />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Movies;