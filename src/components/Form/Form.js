import React, { useState } from "react";

function Form (props) {
  return (
    <form className="form" name={props.formName}>
      <h1 className="form__title">{props.title}</h1>
      <div className="form__input-container">
        {props.children}
        <h2 className="form__input-name">E-mail</h2>
        <input type="email" className="form__input" />
        <h2 className="form__input-name">Пароль</h2>
        <input type="password" className="form__input" />
        <span className="form__error-span">Что-то пошло не так...</span>
      </div>
      <button type="submit" className="form__submit-button">{props.buttonText}</button>
    </form>
  );
};

export default Form;