import React, {useEffect} from "react";
import './NavigationPopup.css';
import { NavLink } from "react-router-dom";
import  profile__image from '../../images/header__profile-image.svg';

function NavigationPopup (props) {

  // это необходимо, чтобы удалить/добавить слушатели
  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props.isOpen]);


  // закрыть попап при нажатии на esc, вдруг пригодится
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      props.onClose();
    }
  }

  // закрыть попап при клике по затемненному участку
  function handleClickOutside(e) {
    if (e.target.classList.contains("navigation-popup__background")) {
      props.onClose();
    }
  }

  return (
    <div className={`navigation-popup__background ${props.isOpen ? 'navigation-popup__background_active' : ''}`}>
      <div className={`navigation-popup ${props.isOpen ? 'navigation-popup_active' : ''}`}>
        <div className='navigation-popup__close-button' onClick={props.onClose} />
        <nav className="navigation-popup__container">
          <NavLink onClick={props.onClose} to="/" className={({ isActive }) => isActive ? 'navigation-popup__button_active' : 'navigation-popup__button'}>Главная</NavLink>
          <NavLink onClick={props.onClose} to="/movies" className={({ isActive }) => isActive ? 'navigation-popup__button_active' : 'navigation-popup__button'}>Фильмы</NavLink>
          <NavLink onClick={props.onClose} to="/saved-movies" className={({ isActive }) => isActive ? 'navigation-popup__button_active' : 'navigation-popup__button'}>Сохраненные фильмы</NavLink>
          <NavLink onClick={props.onClose} to="/profile" className="navigation-popup__profile-button">
            <img src={profile__image} alt="Картинка профиля" className="navigation-popup__profile-image" />
            <p className="navigation-popup__profile-text">Аккаунт</p>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default NavigationPopup;