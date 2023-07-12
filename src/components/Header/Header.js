import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import './Header.css';
import logo from '../../images/logo.svg';

function Header (props) {
    return (
      // определяем, какой цвет у шапки должен быть
      <header className={`header ${props.isHeaderDark ? 'header_theme_dark' : 'header_theme_blue'}`}>
        <Link to="/"><img className="header__logo" src={logo} alt="Логотип" /></Link>
        {/* компонент панели навигации */}
        <Navigation
          onBurgerMenuClick={props.onBurgerMenuClick}
          isLoggedIn={props.isLoggedIn} />
      </header>
    );
};

export default Header;