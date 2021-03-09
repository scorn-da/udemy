'use strict';

let numberOfFilms;
const COUNTING_START_VALUE = 1;

function init() {
  numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

  while (!numberOfFilms || isNaN(numberOfFilms)) {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
  }
}

init();

const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false,
};

function rememberFilms() {
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
}

rememberFilms();

function checkPersonLevel() {
  if (!!personalMovieDB.count && personalMovieDB.count < 10) {
    console.log('Вы посмотрели слишком мало фильмов');
  } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    console.log('Вы классический зритель');
  } else if (personalMovieDB.count >= 30) {
    console.log('Вы киноман');
  } else {
    console.log('Произошла ошибка');
  }
}

checkPersonLevel();

function showPersonDB(isPrivate) {
  if (!isPrivate) {
    console.log(personalMovieDB);
  }
}

showPersonDB(personalMovieDB.private);

function writeGenres() {
  for(let i = 0; i < 3; i++) {
    personalMovieDB.genres.push(prompt(`Ваш любимый жанр под номером ${i + COUNTING_START_VALUE}`, ''));
  }
}

writeGenres();