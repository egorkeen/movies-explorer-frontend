import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';
import  profile__image from '../../images/header__profile-image.svg';

function Navigation (props) {

// меню навигации для авторизованных пользователей
  if (props.isLoggedIn) {
      return (
      <>
        <nav className="navigation__container">
          <NavLink to="/movies" className={({ isActive }) => isActive ? 'navigation__button_active' : 'navigation__button'}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={({ isActive }) => isActive ? 'navigation__button_active' : 'navigation__button'}>Сохраненные фильмы</NavLink>
          <NavLink to="/profile" className='navigation__profile-button'>
            <img src={profile__image} alt="Картинка профиля" className="navigaiton__profile-image" />
            <p className="navigation__profile-text">Аккаунт</p>
          </NavLink>
        </nav>
        {/* бургер-меню */}
        <div className="navigation__burger-menu" onClick={props?.onBurgerMenuClick}/>
        {/* панель навигации в попапе */}
      </>
      )
  } else {
    // это шапка для стартовой страницы
    return (
      <>
        <nav className="header__container">
          <NavLink to="/signup" className="header__register-button">Регистрация</NavLink>
          <NavLink to="/signin" className="header__login-button">Войти</NavLink>
        </nav>
      </>
    );
  };
};

export default Navigation;