import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import logo from '../../images/logo.svg';

function Register (props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      name: name,
      email: email,
      password: password
    })
  };

  return (
    <div className="page">
      <section className="register">
        <div className="register__container">
        <img className="logo" src={logo} alt="Логотип"/>
        <Form handleSubmit={handleSubmit} formName='register-form' title='Добро пожаловать!' buttonText='Зарегистрироваться'>
          {/* name */}
          <h2 className="form__input-name">Имя</h2>
          <input 
            onChange={handleNameChange} 
            value={name} 
            type="text" 
            className="form__input"
            minLength={2}
            maxLength={30}
            required 
          />
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
        <span className="register__span">Уже зарегистрированы? <Link className="register__link" to='/signin'>Войти</Link></span>
      </section>
    </div>
  );
};

export default Register;