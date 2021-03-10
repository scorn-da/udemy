'use strict';

let numberOfFilms;
const COUNTING_START_VALUE = 1;

const personalMovieDB = {
  count:  0,
  movies: {},
  actors: {},
  genres: [],
  private: false,

  init: function () {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

    while (!numberOfFilms || isNaN(numberOfFilms)) {
       this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
  },

  rememberFilms: function () {
    for (let i = 0; i < 2; i++) {
      const lastViewedFilm = prompt('Один из последних просмотренных фильмов', ''),
        lastViewedFilmMark = prompt('На сколько его оцените?', '');

      if(!!lastViewedFilm && !!lastViewedFilmMark && lastViewedFilm.length < 50) {
        this.movies[lastViewedFilm] = lastViewedFilmMark;
        console.log('done');
      } else {
        console.log('error');
        i--;
      }
    }
  },

  checkPersonLevel: function () {
    if(!!this.count && this.count < 10) {
      console.log('Вы посмотрели слишком мало фильмов');
    } else if(this.count >= 10 && this.count < 30) {
      console.log('Вы классический зритель');
    } else if(this.count >= 30) {
      console.log('Вы киноман');
    } else {
      console.log('Произошла ошибка');
    }
  },

  showPersonDB: function (isPrivate) {
    if(!isPrivate) {
      console.log(this);
    }
  },

  writeGenres: function () {
    let genre;
    for (let i = 0; i < 3; i++) {
      genre = prompt(`Ваш любимый жанр под номером ${i + COUNTING_START_VALUE}`, '');
      if (!!genre) {
        this.genres.push(genre);
      } else {
        i--;
      }
    }
    personalMovieDB.genres.forEach((genre, index) =>  {
      console.log(`Любимый жанр #${index + 1} — это ${genre}`);
    })
  },

  toggleDBVisibility: function () {
    console.log(this.private);
    if (!this.private) {
      this.private = !this.private;
    }
  },
};
