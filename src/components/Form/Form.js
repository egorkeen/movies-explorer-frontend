import React from "react";

function Form (props) {
  return (
    <form onSubmit={props.handleSubmit} className="form" name={props.formName} noValidate>
      <h1 className="form__title">{props.title}</h1>
      <div className="form__input-container">
        {props.children}
      </div>
      <button type="submit" className={`${props.isSubmitActive ? "form__submit-button" : 'form__submit-button_inactive'}`}>{props.buttonText}</button>
    </form>
  );
};

export default Form;