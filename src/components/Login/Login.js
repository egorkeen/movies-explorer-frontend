import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import logo from '../../images/logo.svg';

function Login (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isSubmitActive, setSubmitActive] = useState();

  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid(email) && isPasswordValid(password)) {
      props.onSubmit({
        email: email,
        password: password
      })
    } else {
      setEmailError(isEmailValid(email) ? '' : 'Введите корректный email');
      setPasswordError(isPasswordValid(password) ? '' : 'Минимальная длина пароля 6 символов');
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

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
    if (isEmailValid(email) && isPasswordValid(password)) {
      setSubmitActive(true);
    } else {
      setSubmitActive(false);
    }
  }, [email, password]);

  useEffect(() => {
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
      <section className="login">
        <div className="login__container">
          <Link to="/">
            <img className="logo" src={logo} alt="Логотип"/>
          </Link>
          <Form 
            handleSubmit={handleSubmit} 
            formName='login-form' 
            title='Рады видеть!' 
            buttonText='Войти'
            isSubmitActive={isSubmitActive}
          >
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
        <span className="login__span">Ещё не зарегистрированы? <Link className="login__link" to='/signup'>Регистрация</Link></span>
      </section>
    </div>
  );
};

export default Login;