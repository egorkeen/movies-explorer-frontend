// styles
import './App.css';
// react
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
// контексты
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
// api
import mainApi from '../../utils/MainApi';
// картинки
import successImage from '../../images/success.png';
import errorImage from '../../images/error.png';
import moviesApi from '../../utils/MoviesApi';

function App() {

  const [currentUser, setCurrentUser] = useState();
  // переменные состояния
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const [isLoadingMovies, setLoadingMovies] = useState(false);
  const [isLoadingSavedMovies, setLoadingSavedMovies] = useState(false);
  const [shortsActive, setShortsActive] = useState(false);
  const [savedShortsActive, setSavedShortsActive] = useState(false);
  // переменные фильмов
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  // переменные отвечающие за текст попапов 
  const [successText, setSuccessText] = useState('Успешно!');
  const [errorText, setErrorText] = useState('Ошибка!');

  const navigate = useNavigate();
  const location = useLocation();

  // проверка токена
  async function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        const res = await mainApi.checkToken(jwt);
        if (res) {
          setLoggedIn(true);
          const userData = await mainApi.getUserData();
          setCurrentUser(userData);
        }
      } catch (err) {
        setErrorPopupOpen(true);
        setErrorText(`Ошибка ${err}`);
        console.log(err);
      }
    }
  };

  // закрыть попапы и бургер-меню
  function closeAllPopups() {
    setBurgerMenuOpen(false);
    setSuccessPopupOpen(false);
    setErrorPopupOpen(false);
  };

  // открыть бургер-меню
  function openNavigationPopup () {
    setBurgerMenuOpen(true);
  }; 

  // регистрация
  async function handleSignUpSubmit(userData) {
    try {
      await mainApi.signUp(userData);
      await handleSignInSubmit(userData);
    } catch (err) {
      setErrorPopupOpen(true);
      setErrorText(`Ошибка ${err}`);
      console.log(err);
    };
  };

  // авторизация
  async function handleSignInSubmit (userData) {
    try {
      const res = await mainApi.signIn(userData);
      localStorage.setItem("jwt", res.token);
      const user = await mainApi.getUserData();
      setCurrentUser(user);
      setLoggedIn(true);
      navigate('/movies', {  replace: true });
    } catch (err) {
      setErrorPopupOpen(true);
      setErrorText(`Ошибка ${err}`);
      console.log(err);
    };
  };

  // выход из аккаунта
  function handleSignOutClick () {
    // удаляем все данные пользователя на устройстве
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('inputMoviesValue');
    localStorage.removeItem('shortsActive');
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/", { replace: true });
    setSavedMovies([]);
    setMovies([]);
  };

  // обновить данные профиля
  async function handleUpdateUserProfile (userData) {
    try {
      const updatedUserData = await mainApi.updateUserProfile(userData);
      setCurrentUser(updatedUserData);
      setSuccessText('Вы успешно обновили данные');
      setSuccessPopupOpen(true);
    } catch (err) {
      setErrorPopupOpen(true);
      setErrorText(`Ошибка ${err}`);
      console.log(err);
    };
  };

  // функции с фильмами
  // добавить фильм
  async function handleSaveMovie (movie) {
    try {
      const addedMovie = await mainApi.createMovie(movie);
      setSavedMovies([addedMovie, ...savedMovies]);
    } catch (err) {
      setErrorPopupOpen(true);
      setErrorText(`Ошибка ${err}`);
      console.log(err);
    }
  }

  // удалить фильм из сохраненных
  async function handleDeleteMovie (movie) {
    try {
      if (location.pathname === '/movies') {
        const selectedMovie = savedMovies.find(m => m.movieId === movie.id);
        await mainApi.deleteMovie(selectedMovie._id);
        const updatedMovies = savedMovies.slice().filter(m => m !== selectedMovie);
        setSavedMovies(updatedMovies);
      } else if (location.pathname === '/saved-movies') {
        await mainApi.deleteMovie(movie._id);
        const updatedMovies = savedMovies.slice().filter(m => m !== movie);
        setSavedMovies(updatedMovies);
      }
    } catch (err) {
      setErrorPopupOpen(true);
      setErrorText(`Ошибка ${err}`);
      console.log(err);
    }
  }

  // нажатие на кнопку короткометражки
  const handleToggleClick = () => {
    if (location.pathname === '/movies') {
      setLoadingMovies(true);
      const state = !shortsActive;
      setShortsActive(state);
      // сохраняем положение переключателя в локальном хранилище
      localStorage.setItem('shortsActive', JSON.stringify(state));
      const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
      const filteredMovies = filterByShorts(searchedMovies, state);
      const sortedMovies = sortMovies(filteredMovies, savedMovies);
      setMovies(sortedMovies);
      setLoadingMovies(false);
    } else if (location.pathname === '/saved-movies') {
      setSavedShortsActive(!savedShortsActive);
    }
  };

    // фильтрация фильмов на короткометражки
  function filterByShorts(movies, state) {
    return state ? movies.filter((movie) => movie.duration <= 40) : movies;
  }

  // сортировка добавленных фильмов
  function sortMovies (movies, savedMovies) {
    const sortedMovies = movies.map((movie) => {
      movie.isAdded = savedMovies.some(
        (savedMovie) => savedMovie.movieId === movie.id
      );
      return movie;
    });

    return sortedMovies;
  };
  
  // Submit кнопки поиска фильмов
  async function handleSearchSubmit (keyword) {
    try {
      const key = new RegExp(keyword, "gi");
      if (location.pathname === '/movies') {
        setLoadingMovies(true);
        const movies = await moviesApi.getMovies();
        const findedMovies = movies.filter(
          (item) => key.test(item.nameRU) || key.test(item.nameEN)
        );
        const checkedMovies = sortMovies(findedMovies, savedMovies);
        localStorage.setItem('searchedMovies', JSON.stringify(checkedMovies));
        setMovies(filterByShorts(checkedMovies, shortsActive) || []);
        setLoadingMovies(false);
      } else if (location.pathname === '/saved-movies') {
        setLoadingSavedMovies(true);
        const movies = await mainApi.getMovies();
        const findedMovies = movies.filter(
          (item) => key.test(item.nameRU) || key.test(item.nameEN)
        );
        const userMovies = findedMovies.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(filterByShorts(userMovies, savedShortsActive) || []);
        setLoadingSavedMovies(false);
      }
    } catch (err) {
      setErrorPopupOpen(true);
      setErrorText(`Ошибка ${err}`);
      console.log(err);
    }
  }

  // useEffect'ы
  // проверка токена
  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      setLoadingMovies(true);
      mainApi
        .getMovies()
        .then((savedMovies) => {
          const userMovies = savedMovies.filter((savedMovie) => savedMovie.owner === currentUser._id);
          setSavedMovies(userMovies);

          if (localStorage.getItem('searchedMovies')) {
            const state = JSON.parse(localStorage.getItem('shortsActive'));
            setShortsActive((state) || false);
            // ищем фильмы, которые искали ранее
            const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
            // сортируем добавленные и нет
            const sortedMovies = sortMovies(searchedMovies, userMovies);
            // фильтруем короткометражки
            const filteredMovies = filterByShorts(sortedMovies, state);
            setMovies(filteredMovies);
            setLoadingMovies(false);
          } else {
            moviesApi
              .getMovies()
              .then((movies) => {
                const sortedMovies = sortMovies(movies, userMovies);
                localStorage.setItem('searchedMovies', JSON.stringify(sortedMovies));
                const filteredMovies = filterByShorts(sortedMovies, shortsActive);
                setMovies(filteredMovies);
                setLoadingMovies(false);
              })
              .catch((err) => {
                setErrorPopupOpen(true);
                setErrorText(`Ошибка ${err}`);
                console.log(err);
              });
          }
        })
        .catch((err) => {
          setErrorPopupOpen(true);
          setErrorText(`Ошибка ${err}`);
          console.log(err);
        })
    }
  }, [currentUser]);

  useEffect(() => {
    const sortedMovies = sortMovies(movies, savedMovies);
    setMovies(sortedMovies);
  }, [savedMovies]);

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
              isLoggedIn={isLoggedIn}
            />
          } 
        />

        {/* роут авторизации */}
        <Route 
          path="/signin" 
          element={
            <Login
              onSubmit={handleSignInSubmit}
              isLoggedIn={isLoggedIn}
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
              movies={movies}
              onSaveClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
              isLoading={isLoadingMovies}
              onSubmit={handleSearchSubmit}
              onToggleClick={handleToggleClick}
              shortsActive={shortsActive}
              setErrorPopupOpen={setErrorPopupOpen}
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
              savedMovies={savedMovies}
              onDeleteClick={handleDeleteMovie}
              isLoading={isLoadingSavedMovies}
              onSubmit={handleSearchSubmit}
              onToggleClick={handleToggleClick}
              shortsActive={savedShortsActive}
              setErrorPopupOpen={setErrorPopupOpen}
              setErrorText={setErrorText}
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
              setErrorPopupOpen={setErrorPopupOpen}
              setErrorText={setErrorText}
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