import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import './Header.css';
import logo from '../../images/logo.svg';

function Header ({ isHeaderDark, onBurgerMenuClick, loggedIn }) {
    return (
      // определяем, какой цвет у шапки должен быть
      <header className={`header ${isHeaderDark ? 'header_theme_dark' : 'header_theme_blue'}`}>
          <div className="header__content">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
              {/* компонент панели навигации */}
              <Navigation
                onBurgerMenuClick={onBurgerMenuClick}
                loggedIn={loggedIn} 
            />
          </div>
      </header>
    );
};

export default Header;