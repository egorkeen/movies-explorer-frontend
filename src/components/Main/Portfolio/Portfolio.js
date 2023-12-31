import React from "react";
import pointer from "../../../images/portfolio__pointer.svg";

function Portfolio (props) {
  return (
    <section className="portfolio">
      <div className="portfolio__content">
        <h2 className="portfolio__title">Портфолио</h2>
        <div className="portfolio__websites">

          <a target="_blank" href="https://egorkeen.github.io/how-to-learn/" className="portfolio__website" rel="noreferrer">
            <h3 className="portfolio__website-name">Статичный сайт</h3>
            <img className="portfolio__pointer-image" src={pointer} alt="Ссылка на сайт" />
          </a>

          <a target="_blank" href="https://egorkeen.github.io/russian-travel/" className="portfolio__website" rel="noreferrer">
            <h3 className="portfolio__website-name">Адаптивный сайт</h3>
            <img className="portfolio__pointer-image" src={pointer} alt="Ссылка на сайт" />
          </a>

          <a target="_blank" href="https://github.com/egorkeen/react-mesto-api-full-gha" className="portfolio__website" rel="noreferrer">
            <h3 className="portfolio__website-name">Одностраничное приложение</h3>
            <img className="portfolio__pointer-image" src={pointer} alt="Ссылка на сайт" />
          </a>

        </div>
      </div>
    </section>
  );
};

export default Portfolio;