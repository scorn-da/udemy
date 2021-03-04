const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false,
};

const lastViewedFilm = prompt('Один из последних просмотренных фильмов', '');
const lastViewedFilmMark = prompt('На сколько его оцените?', '');

personalMovieDB.movies[lastViewedFilm] = lastViewedFilmMark;
console.log(personalMovieDB);