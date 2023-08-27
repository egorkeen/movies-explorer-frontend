import React from "react";

function Footer (props) {
  return (
    <footer className="footer">
      <span className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className="footer__container">
        <span className="footer__date">© 2023</span>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/" target="_blank" className="footer__link" rel="noreferrer">Яндекс Практикум</a>
          <a href="https://github.com/egorkeen/" target="_blank" className="footer__link" rel="noreferrer">Github</a>
        </div>
      </div>  
    </footer>
  );
};

export default Footer;