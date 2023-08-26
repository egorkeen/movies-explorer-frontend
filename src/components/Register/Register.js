import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import logo from '../../images/logo.svg';

function Register (props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isSubmitActive, setSubmitActive] = useState();

  const navigate = useNavigate();

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
    if (isNameValid(name) && isEmailValid(email) && isPasswordValid(password)) {
      props.onSubmit({
        name: name,
        email: email,
        password: password
      })
    } else {
      setNameError(isNameValid(name) ? '' : 'Минимальная длина 2 символа');
      setEmailError(isEmailValid(email) ? '' : 'Введите корректный email');
      setPasswordError(isPasswordValid(password) ? '' : 'Минимальная длина пароля 6 символов');
    }
  };

  const isNameValid = (name) => {
    const nameRegex = /^.{2,30}$/;
    return nameRegex.test(name);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  useEffect(() => {
    if (isNameValid(name)) {
      setNameError('Минимальная длина имени 2 символа');
    }
  }, [name]);

  useEffect(() => {
    if (!isEmailValid(email)) {
      setEmailError('Введите корректный email');
    }
  }, [email]);

  useEffect(() => {
    if (!isPasswordValid(password)) {
      setPasswordError('Минимальная длина пароля 6 символов');
    }
  }, [password]);

  useEffect(() => {
    if (isNameValid(name) && isEmailValid(email) && isPasswordValid(password)) {
      setSubmitActive(true);
    } else {
      setSubmitActive(false);
    }
  }, [name, email, password]);

  useEffect(() => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
  }, []);

  useEffect(() => {
    if (props.isLoggedIn) {
      navigate("/movies", { replace: true })
    }
  }, [props.isLoggedIn]);

  return (
    <div className="page">
      <section className="register">
        <div className="register__container">
          <Link to="/">
            <img className="logo" src={logo} alt="Логотип"/>
          </Link>
        <Form 
          handleSubmit={handleSubmit} 
          formName='register-form' 
          title='Добро пожаловать!' 
          buttonText='Зарегистрироваться'
          isSubmitActive={isSubmitActive}
        >
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
          <span className={`form__validation-error ${isNameValid(name) ? '' : 'form__validation-error_active'}`}>{nameError}</span>
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
          <span className={`form__validation-error ${isEmailValid(email) ? '' : 'form__validation-error_active'}`}>{emailError}</span>
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
          <span className={`form__validation-error ${isPasswordValid(password) ? '' : 'form__validation-error_active'}`}>{passwordError}</span>
        </Form>
        </div>
        {/* span ниже не в контейнере для расположения по центру */}
        <span className="register__span">Уже зарегистрированы? <Link className="register__link" to='/signin'>Войти</Link></span>
      </section>
    </div>
  );
};

export default Register;