class MainApi {

  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // проверить статус запроса
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    };
  };

  // запросы, связанные с пользователем

  // получить данные пользователя
  getUserData() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkStatus);
  };

  // обновить имя и почту
  updateUserProfile(userData) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email
      })
    }).then(this._checkStatus);
  };

  // запросы регистрации, авторизации и проверки токена

  // регистрация
  signUp(userData) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password
      })
    }).then(this._checkStatus);
  };

  // авторизация
  signIn(userData) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
      })
    }).then(this._checkStatus);
  };

  // проверка токена
  checkToken(token) {
    return fetch(this._baseUrl +'/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`
      }
   })
   .then(this._checkStatus);
  };

  // запросы, связанные с фильмами

  // получить список сохраненных фильмов
  getMovies() {
    return fetch( this._baseUrl + '/movies', {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    }).then(this._checkStatus);
  };

  // добавить фильм в сохраненные
  createMovie(movie) {
    return fetch( this._baseUrl + '/movies', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: (`https://api.nomoreparties.co${movie.image.url}`),
        trailerLink: movie.trailerLink,
        thumbnail: (`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`),
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    }).then(this._checkStatus);
  }

  deleteMovie(movieId) {
    return fetch( this._baseUrl + `/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        id: movieId
      })
    }).then(this._checkStatus);
  };
}

const mainApi = new MainApi('http://localhost:3000');

export default mainApi;