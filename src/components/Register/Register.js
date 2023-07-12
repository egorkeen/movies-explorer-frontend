import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import logo from '../../images/logo.svg';

function Register (props) {
  return (
    <div className="page">
      <section className="register">
        <div className="register__container">
        <img className="logo" src={logo} alt="Логотип"/>
        <Form formName='register-form' title='Добро пожаловать!' buttonText='Зарегистрироваться'>
          <h2 className="form__input-name">Имя</h2>
          <input type="text" className="form__input" />
        </Form>
        </div>
        {/* span ниже не в контейнере для расположения по центру */}
        <span className="register__span">Уже зарегистрированы? <Link className="register__link" to='/signin'>Войти</Link></span>
      </section>
    </div>
  );
};

export default Register;