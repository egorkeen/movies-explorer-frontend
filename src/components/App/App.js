import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NavigationPopup from "../NavigationPopup/NavigationPopup";
import NotFound from '../NotFound/NotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Егор",
    email: 'egor.keen@mail.ru',
  });
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  // функции открытия и закрытия попапа с навигацией для смартфонов и планшетов
  function openNavigationPopup () {
    setBurgerMenuOpen(true);
  }

  function closeNavigationPopup () {
    setBurgerMenuOpen(false);
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
              isLoggedIn={isLoggedIn}
            />
          } 
        />

        {/* роут регистрации */}
        <Route 
          path="/signup" 
          element={
            <Register
              // здесь будут пропсы
            />
          } 
        />

        {/* роут авторизации */}
        <Route 
          path="/signin" 
          element={
            <Login
              // здесь будут пропсы
            />
          } 
        />

        {/* роут с поиском фильмов */}
        <Route 
          path="/movies" 
          element={
            <Movies
              onBurgerMenuClick={openNavigationPopup}
              isLoggedIn={isLoggedIn}
            />
          } 
        />

        {/* Роут сохраненных фильмов */}
        <Route 
          path="/saved-movies" 
          element={
            <SavedMovies
            onBurgerMenuClick={openNavigationPopup}
            isLoggedIn={isLoggedIn}
            />
          } 
        />

        {/* роут с профилем */}
        <Route 
          path="/profile" 
          element={
            <Profile
              currentUser={currentUser}
              onBurgerMenuClick={openNavigationPopup} 
              isLoggedIn={isLoggedIn}
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
        onClose={closeNavigationPopup} 
        isOpen={isBurgerMenuOpen} 
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
