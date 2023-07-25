import './App.css';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState } from 'react';
// компоненты
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NavigationPopup from "../NavigationPopup/NavigationPopup";
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
// api'шки
import mainApi from '../../utils/MainApi';
// картинки
import successImage from '../../images/success.png';
import errorImage from '../../images/error.png';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Егор",
    email: 'egor.keen@mail.ru',
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  
  const [successText, setSuccessText] = useState('Успешно!');
  const [errorText, setErrorText] = useState('Ошибка!');

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            mainApi
              .getUserData()
              .then((res) => {
                console.log(res);
                setCurrentUser(res);
              });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function closeAllPopups() {
    setBurgerMenuOpen(false);
    setSuccessPopupOpen(false);
    setErrorPopupOpen(false);
  }

  function openNavigationPopup () {
    setBurgerMenuOpen(true);
  }

  function handleSignUpSubmit(userData) {
    mainApi
      .signUp(userData)
      .then(() => {
        setSuccessText('Вы успешно зарегистрировались!');
        setSuccessPopupOpen(true);
        navigate('/signin', { replace: true });
      })
      .catch((err) => {
        setErrorText(`Ошибка ${err}`);
        setErrorPopupOpen(true);
        console.log(err);
      })
  };

  function handleSignInSubmit(userData) {
    mainApi
      .signIn(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        mainApi
          .getUserData()
          .then((userData) => {
            setCurrentUser(userData)
            setLoggedIn(true);
            navigate('/', { replace: true });
          })    
      })
      .catch((err) => {
        setErrorText(`Ошибка ${err}`);
        setErrorPopupOpen(true);
        console.log(err);
      });
  };

  function handleSignOutClick () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  function handleUpdateUserProfile(userData) {
    mainApi
      .updateUserProfile(userData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        setSuccessText('Вы успешно обновили данные!')
        setSuccessPopupOpen(true);
      })
      .catch((err) => {
        setErrorText(`Ошибка ${err}`);
        console.log(err);
        setErrorPopupOpen(true);
      })
  }

  // приложение
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>

        {/* главная страница */}
        <Route 
          path="/" 
          element={
            <Main
              onBurgerMenuClick={openNavigationPopup} 
              loggedIn={isLoggedIn}
            />
          } 
        />

        {/* роут регистрации */}
        <Route 
          path="/signup" 
          element={
            <Register
              onSubmit={handleSignUpSubmit}
            />
          } 
        />

        {/* роут авторизации */}
        <Route 
          path="/signin" 
          element={
            <Login
              onSubmit={handleSignInSubmit}
            />
          } 
        />

        {/* роут с поиском фильмов */}
        <Route 
          path="/movies" 
          element={
            <ProtectedRoute
              element={Movies}
              onBurgerMenuClick={openNavigationPopup}
              loggedIn={isLoggedIn}
              openErrorPopup={setErrorPopupOpen}
              setErrorText={setErrorText}
            />
          } 
        />

        {/* Роут сохраненных фильмов */}
        <Route 
          path="/saved-movies" 
          element={
            <ProtectedRoute
              element={SavedMovies}
              onBurgerMenuClick={openNavigationPopup}
              loggedIn={isLoggedIn}
            />
          } 
        />

        {/* роут с профилем */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute
              element={Profile}
              currentUser={currentUser}
              onBurgerMenuClick={openNavigationPopup} 
              loggedIn={isLoggedIn}
              onSignOut={handleSignOutClick}
              onSubmit={handleUpdateUserProfile}
            />
          }
        />

        <Route
          path='*'
          element={
            <NotFound />
          }
        />

      </Routes>
      {/* попап навигации */}
      <NavigationPopup 
        onClose={closeAllPopups} 
        isOpen={isBurgerMenuOpen} 
      />

      <InfoTooltip
        imgLink={successImage}
        alt={successText}
        titleText={successText}
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        imgLink={errorImage}
        alt={errorText}
        titleText={errorText}
        isOpen={isErrorPopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
