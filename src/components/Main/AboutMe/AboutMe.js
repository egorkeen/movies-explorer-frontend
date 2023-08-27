import React from "react";
import photo from "../../../images/about-me__photo.jpg";

function AboutMe (props) {
  return (
    <section className="about-me">
      <div className="about-me__limit">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__content">
          <div className="about-me__container">
            <h3 className="about-me__description-title">Егор</h3>
            <p className="about-me__info">Frontend-разработчик, 21 год</p>
            <p className="about-me__description">
            Я проживаю в Ростове-на-Дону, закончил направление "Лингвистика" в ДГТУ.
            В прошлом году я решил попробовать себя в программировании и я начал обучение
            на курсах веб-разработки от Яндекс Практикума. В свободное время я люблю
            слушать музыку, смотреть фильмы, сериалы и аниме, а также петь песни под гитару.
            </p>
            <a target="_blank" href="https://github.com/egorkeen" className="about-me__link" rel="noreferrer">Github</a>
          </div>
          <img src={photo} alt="Фото студента" className="about-me__photo" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;