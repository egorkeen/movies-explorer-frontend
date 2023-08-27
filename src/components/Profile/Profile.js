import React, { useState, useEffect } from "react";
import Header from '../Header/Header';

function Profile ({ currentUser, onSubmit, loggedIn,onBurgerMenuClick, onSignOut, setErrorText, setErrorPopupOpen }) {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

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
    if (name !== currentUser.name || email !== currentUser.email) {
      if (isNameValid(name) && isEmailValid(email)) {
        onSubmit({
          name: name,
          email: email
        })
        setSubmitActive(false);
      }
    } else {
      setErrorText('Введенные данные не должны совпадать с текущими!');
      setErrorPopupOpen(true);
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

  useEffect(() => {
    if (name !== currentUser.name || email !== currentUser.email) {
      if (isNameValid(name) && isEmailValid(email)) {
        setSubmitActive(true);
      } else {
        setSubmitActive(false);
      }
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
        onBurgerMenuClick={onBurgerMenuClick} 
        loggedIn={loggedIn}
      />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <div className="profile__data">
          <div className="profile__container">
            <h2 className="profile__data-name">Имя</h2>
            <input className="profile__input" type="text" onChange={handleNameChange} value={name} minLength={2} maxLength={30} required noValidate />
          </div>
          <span className={`profile__validation-error ${isNameValid(name) ? '' : 'profile__validation-error_active'}`}>{nameError}</span>
          <div className="profile__border" />
          <div className="profile__container">
            <h2 className="profile__data-name">E-mail</h2>
            <input className="profile__input" type="email" onChange={handleEmailChange} value={email} minLength={6} required noValidate />
          </div>
          <span className={`profile__validation-error ${isEmailValid(email) ? '' : 'profile__validation-error_active'}`}>{emailError}</span>
        </div>
        <button onClick={handleSubmitChanges} type="submit" className={`${isSubmitActive ? 'profile__submit-button' : 'profile__submit-button_inactive'}`}>Редактировать</button>
        <button className="profile__sign-out-button" onClick={onSignOut}>Выйти из аккаунта</button>
      </section>
    </div>
  );
};

export default Profile;