import React, { useState } from "react";

function Form (props) {
  return (
    <form onSubmit={props.handleSubmit} className="form" name={props.formName}>
      <h1 className="form__title">{props.title}</h1>
      <div className="form__input-container">
        {props.children}
      </div>
      <button type="submit" className="form__submit-button">{props.buttonText}</button>
    </form>
  );
};

export default Form;