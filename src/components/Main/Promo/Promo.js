import React from "react";
import promo__image from '../../../images/promo__image.png';

function Promo (props) {
  return (
    <section className="promo">
      <div className="promo__content">
        <div className="promo__container">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <a className="promo__link" href="#about-project">Узнать больше</a>
          </div>
        <img src={promo__image} className="promo__image" alt="Картинка" />
      </div>
    </section>
  );
};

export default Promo;