import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import logo from '../../images/logo.svg';

function Login (props) {
  return (
    <div className="page">
      <section className="login">
        <div className="login__container">
          <img className="logo" src={logo} alt="Логотип"/>
          <Form formName='login-form' title='Рады видеть!' buttonText='Войти'>
            
          </Form>
        </div>
       {/* span ниже не в контейнере для расположения по центру */}
        <span className="login__span">Ещё не зарегистрированы? <Link className="login__link" to='/signup'>Регистрация</Link></span>
      </section>
    </div>
  );
};

export default Login;