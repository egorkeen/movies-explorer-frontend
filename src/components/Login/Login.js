import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import logo from '../../images/logo.svg';

function Login (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      email: email,
      password: password
    })
  };

  return (
    <div className="page">
      <section className="login">
        <div className="login__container">
          <img className="logo" src={logo} alt="Логотип"/>
          <Form handleSubmit={handleSubmit} formName='login-form' title='Рады видеть!' buttonText='Войти'>
            {/* e-mail */}
            <h2 className="form__input-name">E-mail</h2>
            <input
              onChange={handleEmailChange}
              value={email} 
              type="email" 
              className="form__input" 
              minLength={4}
              maxLength={30}
              required 
            />
            {/* password */}
            <h2 className="form__input-name">Пароль</h2>
            <input 
              onChange={handlePasswordChange}
              value={password}
              type="password" 
              className="form__input"
              minLength={6}
              required  
            />
          </Form>
        </div>
       {/* span ниже не в контейнере для расположения по центру */}
        <span className="login__span">Ещё не зарегистрированы? <Link className="login__link" to='/signup'>Регистрация</Link></span>
      </section>
    </div>
  );
};

export default Login;