import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound () {

  const navigate = useNavigate();

  function goBack () {
    navigate(-1);
  }

  return (
    <div className="page">
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <button className="not-found__back-button" onClick={goBack}>Назад</button>
      </section>
    </div>
  );
};

export default NotFound;