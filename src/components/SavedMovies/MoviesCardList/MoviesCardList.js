import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import image1 from '../../../images/card__images/1.png';
import image2 from '../../../images/card__images/2.png';
import image3 from '../../../images/card__images/3.png';
import Preloader from "../../Preloader/Preloader";
 
function MoviesCardList (props) {
  const [isLoading, setLoading] = useState(false);
  // демонстрация preloader
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2300)
  }, []);

  function loadMoreCards () {
    // описываем логику
  }

  return (
    <div className="saved-movies__card-list">
        {/* в дальнейшем здесь будет описана логика рендеринга фильмов */}
        {
          isLoading ?
          <Preloader />
          :
          <div className='saved-movies__container'>
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image1}
            />
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image2}
            />
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image3}
            />
          </div>
        }
    </div>
  );
};

export default MoviesCardList;