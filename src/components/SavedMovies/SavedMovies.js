import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import mainApi from "../../utils/MainApi";

function Movies (props) {
  const [isLoading, setLoading] = useState(false);
  const [isHeaderDark, setHeaderDark] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setLoading(true);
    mainApi
      .getMovies()
      .then((movies) => {
        setLoading(false);
        setCards(movies);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function handleCardDelete(card) {
    console.log(card)
    mainApi
      .deleteMovie(card._id)
      .then((res) => {
        const updatedCards = cards.slice().filter(c => c !== card);
        setCards(updatedCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page">
      <Header
        isHeaderDark={isHeaderDark}
        onBurgerMenuClick={props.onBurgerMenuClick} 
        loggedIn={props.loggedIn} 
      />
      <main className="main">
        <section className="saved-movies">
          <SearchForm />
          <MoviesCardList
            isLoading={isLoading}
            cards={cards}
            onCardDelete={handleCardDelete}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Movies;