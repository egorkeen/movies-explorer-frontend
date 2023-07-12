import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";
import image1 from '../../../images/card__images/1.png';
import image2 from '../../../images/card__images/2.png';
import image3 from '../../../images/card__images/3.png';
import image4 from '../../../images/card__images/4.png';
import image5 from '../../../images/card__images/5.png';
import image6 from '../../../images/card__images/6.png';
import image7 from '../../../images/card__images/7.png';
import image8 from '../../../images/card__images/8.png';
import image9 from '../../../images/card__images/9.png';
import image10 from '../../../images/card__images/10.png';
import image11 from '../../../images/card__images/11.png';
import image12 from '../../../images/card__images/12.png';
 
function MoviesCardList (props) {
  const [isLoading, setLoading] = useState(false);
  // демонстрация preloader
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2300);
  }, []);

  function loadMoreCards () {
    // описываем логику
  }

  return (
    <div className="movies__card-list">
        {/* в дальнейшем здесь будет описана логика рендеринга фильмов */}
        {
          isLoading ?
          <Preloader />
          :
          <div className='movies__container'>
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
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image4}
            />
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image5}
            />
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image6}
            />
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image7}
            />
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image8}
            />
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image9}
            />
            <MoviesCard
              name="В погоне за Бенкси"
              duration="27 минут"
              image={image10}
            />
            <MoviesCard
            name="В погоне за Бенкси"
            duration="27 минут"
            image={image11}
            />
            <MoviesCard
            name="В погоне за Бенкси"
            duration="27 минут"
            image={image12}
            />
          </div>
        }
      {/* чтобы кнопка появлялась только когда есть фильмы, я описал примерно похожую логику */}
      {
          isLoading ?
          <></>
          :
          <button onClick={loadMoreCards} className="movies__load-button">Ещё</button>
        }
    </div>
  );
};

export default MoviesCardList;