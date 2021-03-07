'use strict';

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false,
};

for(let i = 0; i < 2; i++) {
  const lastViewedFilm = prompt('Один из последних просмотренных фильмов', ''),
        lastViewedFilmMark = prompt('На сколько его оцените?', '');

  if (!!lastViewedFilm && !!lastViewedFilmMark && lastViewedFilm.length < 50) {
    personalMovieDB.movies[lastViewedFilm] = lastViewedFilmMark;
    console.log('done');
  } else {
    console.log('error');
    i--;
  }
}

if (!!personalMovieDB.count && personalMovieDB.count < 10) {
  console.log('Вы посмотрели слишком мало фильмов');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
  console.log('Вы классический зритель');
} else if (personalMovieDB.count >= 30) {
  console.log('Вы киноман');
} else {
  console.log('Произошла ошибка');
}

console.log(personalMovieDB);