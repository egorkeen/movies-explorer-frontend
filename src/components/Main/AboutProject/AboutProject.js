import React from "react";


function AboutProject (props) {
  return (
    <section id="about-project" className="about-project">
      <div className="about-project__content">
        <h2 className="about-project__title">О проекте</h2>
        {/* контейнер с двумя колонками о проекте */}
        <div className="about-project__columns-container">

          <div className="about-project__two-columns">
            <h3 className="about-project__column-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__column-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>

          <div className="about-project__two-columns">
            <h3 className="about-project__column-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__column-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>

        </div>

        {/* контейнер с прогрессом */}
        <div className="about-project__weeks-container">

          {/* блок с 1-ой неделей */}
          <div className="about-project__green-container">
            <p className="about-project__green-title">1 неделя</p>
            <span className="about-project__span">Back-end</span>
          </div>

          {/* блок с 4-мя неделями */}
          <div className="about-project__gray-container">
            <p className="about-project__gray-title">4 недели</p>
            <span className="about-project__span">Front-end</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutProject;