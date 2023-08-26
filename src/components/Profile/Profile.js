import React, { useState, useEffect } from "react";
import Header from '../Header/Header';

function Profile (props) {
  const [name, setName] = useState(props.currentUser.name);
  const [email, setEmail] = useState(props.currentUser.email);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [isSubmitActive, setSubmitActive] = useState();

  const isHeaderDark = true;

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmitChanges = (e) => {
    e.preventDefault();
    props.onSubmit({
      name: name,
      email: email
    });
  }

  const isNameValid = (name) => {
    const nameRegex = /^.{2,30}$/;
    return nameRegex.test(name);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (isNameValid(name) && isEmailValid(email)) {
      setSubmitActive(true);
    } else {
      setSubmitActive(false);
    }
  }, [name, email]);

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
    setNameError('');
    setEmailError('');
  }, []);

  return (
    <div className="page">
      <Header
        isHeaderDark={isHeaderDark}
        onBurgerMenuClick={props.onBurgerMenuClick} 
        loggedIn={props.loggedIn}
      />
      <section className="profile">
        <h1 className="profile__title">Привет, {props.currentUser.name}</h1>
        <div className="profile__data">
          <div className="profile__container">
            <h2 className="profile__data-name">Имя</h2>
            <input className="profile__input" type="text" onChange={handleNameChange} value={name} minLength={2} maxLength={30} required noValidate />
          </div>
          <span className={`profile__validation-error ${isNameValid(name) ? '' : 'profile__validation-error_active'}`}>{nameError}</span>
          <div className="profile__container">
            <h2 className="profile__data-name">E-mail</h2>
            <input className="profile__input" type="email" onChange={handleEmailChange} value={email} minLength={6} required noValidate />
          </div>
          <span className={`profile__validation-error ${isEmailValid(email) ? '' : 'profile__validation-error_active'}`}>{emailError}</span>
        </div>
        <button onClick={handleSubmitChanges} type="submit" className={`${isSubmitActive ? 'profile__submit-button' : 'profile__submit-button_inactive'}`}>Редактировать</button>
        <button className="profile__sign-out-button" onClick={props.onSignOut}>Выйти из аккаунта</button>
      </section>
    </div>
  );
};

export default Profile;