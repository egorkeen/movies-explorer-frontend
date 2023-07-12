import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import FadeLoader from "react-spinners/FadeLoader";
import image1 from '../../../images/card__images/1.png';
import image2 from '../../../images/card__images/2.png';
import image3 from '../../../images/card__images/3.png';
// import image4 from '../../../images/card__images/4.png';
// import image5 from '../../../images/card__images/5.png';
// import image6 from '../../../images/card__images/6.png';
// import image7 from '../../../images/card__images/7.png';
// import image8 from '../../../images/card__images/8.png';
// import image9 from '../../../images/card__images/9.png';
// import image10 from '../../../images/card__images/10.png';
// import image11 from '../../../images/card__images/11.png';
// import image12 from '../../../images/card__images/12.png';
 
function MoviesCardList (props) {
  const [isLoading, setLoading] = useState(false);
  // демонстрация preloader
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, []);

  function loadMoreCards () {
    // описываем логику
  }

  return (
    <div className="saved-movies__card-list">
        {/* в дальнейшем здесь будет описана логика рендеринга фильмов */}
        {
          isLoading ?
          <div className="saved-movies__preloader">
            <FadeLoader
              color='#424242'
              loading={isLoading}
              size={200}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
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