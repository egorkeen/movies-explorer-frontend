class MoviesApi {

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

  getMovies() {
    return fetch( this._baseUrl + '/', {
      headers: {
        'Content-Type': "application/json",
      },
    }).then(this._checkStatus);
  };

}

const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');

export default moviesApi;