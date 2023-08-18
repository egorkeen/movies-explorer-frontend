// styles
import './App.css';

// react
import { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
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

// api
import mainApi from '../../utils/MainApi';

// картинки
import successImage from '../../images/success.png';
import errorImage from '../../images/error.png';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
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
                setCurrentUser(res);
              });
          }
        })
        .catch((err) => console.log(err));
    };
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
      });
  };

  // авторизация
  function handleSignInSubmit(userData) {
    mainApi
      .signIn(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        mainApi
          .getUserData()
          .then((userData) => {
            setCurrentUser(userData);
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

  // выход из аккаунта
  function handleSignOutClick () {
    // удаляем все данные пользователя на устройстве
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('inputMoviesValue');
    localStorage.removeItem('inputSavedMoviesValue');
    localStorage.removeItem('shortsActive');
    localStorage.removeItem('savedShortsActive');
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/signin", { replace: true });
    setSavedMovies([]);
    setMovies([]);
  };

  // обновление данных профиля
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
      });
  };

  // функции с фильмами
  // добавить фильм
  function handleSaveMovie(movie) {
    mainApi
      .createMovie(movie)
      .then((addedMovie) => {
        setSavedMovies([addedMovie, ...savedMovies]);
      })
      .catch((err) => {
        setErrorText(`Ошибка ${err}`);
        console.log(err);
        setErrorPopupOpen(true);
      })
  }

  // удалить фильм из сохраненных
  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then((res) => {
        // обновляем список сохраненных фильмов
        const updatedMovies = savedMovies.slice().filter(m => m !== movie);
        setSavedMovies(updatedMovies);
      })
      .catch((err) => {
        setErrorText(`Ошибка ${err}`);
        console.log(err);
        setErrorPopupOpen(true);
      })
  }

  // нажатие на кнопку короткометражки
  const handleToggleClick = () => {
    if (location.pathname === '/movies') {
      const newShortsActive = !shortsActive;
      setShortsActive(newShortsActive);
      // сохраняем положение переключателя в локальном хранилище
      localStorage.setItem('shortsActive', JSON.stringify(newShortsActive));
    } else if (location.pathname === '/saved-movies') {
      const newShortsActive = !savedShortsActive;
      setSavedShortsActive(newShortsActive);
      // сохраняем положение переключателя в локальном хранилище
      localStorage.setItem('savedShortsActive', JSON.stringify(newShortsActive));
    }
  };  
  
  // фильтрация фильмов на короткометражки
  function filterByShorts(movies) {
    if (location.pathname === '/movies') {
      return shortsActive ? movies.filter((movie) => movie.duration <= 40) : movies;
    } else if (location.pathname === '/saved-movies') {
      return savedShortsActive ? movies.filter((movie) => movie.duration <= 40) : movies;
    }
  }

  // Submit кнопки поиска фильмов
  function handleSearchSubmit(keyword) {
    // проверяем на каком роуте пользователь решил
    // произвести поиск
    if (location.pathname === '/movies') {
      setLoadingMovies(true);
      moviesApi
      .getMovies()
      .then((movies) => {
        const key = new RegExp(keyword, "gi");
        // Сортируем все фильмы на наличие запроса поиска
        const sortedMovies = movies.filter(
          (item) => key.test(item.nameRU) || key.test(item.nameEN)
        );
        // Теперь фильтруем найденные фильмы на короткометражки
        // и проверяем, добавил ли пользователь ранее эти фильмы
        const filteredMovies = filterByShorts(sortedMovies).map((movie) => {
          movie.isAdded = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
          return movie;
        });
        localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
        // Если фильмов нет, то мы передаем пустой массив.
        // Это необходимо, чтобы в MoviesCardList отобразилась
        // надпись "Ничего не найдено"
        if (filteredMovies.length === 0) {
          setLoadingMovies(false);
          setMovies([]);
        } else {
          setLoadingMovies(false);
          setMovies(filteredMovies);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorText('Во время запроса произошла ошибка');
        setErrorPopupOpen(true);
      });
    } else if (location.pathname === '/saved-movies') {
      setLoadingSavedMovies(true);
        mainApi
          .getMovies()
          .then((movies) => {
            const key = new RegExp(keyword, "gi");
            // Сортируем все фильмы на наличие запроса поиска
            const sortedMovies = movies.filter(
              (item) => key.test(item.nameRU) || key.test(item.nameEN)
            );
            // Теперь фильтруем найденные фильмы на короткометражки
            const filteredMovies = filterByShorts(sortedMovies);
            const userMovies = filteredMovies.filter((movie) => movie.owner === currentUser._id);
            // Если фильмов нет, то мы передаем пустой массив.
            // Это необходимо, чтобы в MoviesCardList отобразилась
            // надпись "Ничего не найдено"
            if (filteredMovies.length === 0) {
              setLoadingSavedMovies(false);
              setSavedMovies([]);
            } else {
              setLoadingSavedMovies(false);
              setSavedMovies(userMovies);
            }
          })
          .catch((err) => {
            console.log(err);
            setErrorText('Во время запроса произошла ошибка');
            setErrorPopupOpen(true);
          });
    }
  };

  // useEffect'ы
  // проверка токена
  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    mainApi
      .getMovies()
      .then((movies) => {
        // сделав запрос, фильтруем фильмы по владельцу
        const userMovies = movies.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(userMovies);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [currentUser]);

  // ставим переключатели в нужное положение
  useEffect(() => {
    const shorts = JSON.parse(localStorage.getItem('shortsActive'));
    if (shorts) {
      setShortsActive(shorts);
    } else {
      setShortsActive(false);
    }
    
    const savedShorts = JSON.parse(localStorage.getItem('savedShortsActive'));
    if (savedShorts) {
      setSavedShortsActive(savedShorts);
    } else {
      setSavedShortsActive(false);
    }
  }, []);

  useEffect(() => {
    // если в локальном хранилище найдутся фильмы, которые искали ранее
    // то произойдет рендеринг предыдущих фильмов
    if (JSON.parse(localStorage.getItem('searchedMovies'))) {
      const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
      // это необходимо для корректного отображения сохраненных фильмов
        // не только на страничке "сохраненные фильмы", но и на "обычных фильмах"
        const filteredMovies = searchedMovies.map((movie) => {
          movie.isAdded = savedMovies.some(
            (savedMovie) => savedMovie.movieId === movie.id
          );
          return movie;
        });
      setMovies(filteredMovies);
      // иначе просто будут отрендерены все фильмы
    } else {
      moviesApi
      .getMovies()
      .then((movies) => {
        // это необходимо для корректного отображения сохраненных фильмов
        // не только на страничке "сохраненные фильмы", но и на "обычных фильмах"
        const sortedMovies = movies.map((movie) => {
          movie.isAdded = savedMovies.some(
            (savedMovie) => savedMovie.movieId === movie.id
          );
          return movie;
        });
        setMovies(sortedMovies);
      })
      .catch((err) => {
        console.log(err);
        setErrorText(`Ошибка ${err}`);
        setErrorPopupOpen(true);
      })
    }
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
              movies={movies}
              onSaveClick={handleSaveMovie}
              isLoading={isLoadingMovies}
              onSubmit={handleSearchSubmit}
              onToggleClick={handleToggleClick}
              shortsActive={shortsActive}
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
              currentUser={currentUser}
              onDeleteClick={handleDeleteMovie}
              isLoading={isLoadingSavedMovies}
              onSubmit={handleSearchSubmit}
              onToggleClick={handleToggleClick}
              shortsActive={savedShortsActive}
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