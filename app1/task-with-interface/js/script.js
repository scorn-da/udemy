/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const promo = document.querySelector('.promo');
const advertising = promo.querySelector('.promo__adv');
const promoBg = promo.querySelector('.promo__bg');
const promoGenre = promo.querySelector('.promo__genre');
const moviesList = promo.querySelector('.promo__interactive-list');

advertising.remove();

promoGenre.textContent = 'Драма';

promoBg.style.backgroundImage = "url('./img/bg.jpg')";

const newMoviesList = new DocumentFragment();

movieDB.movies.sort();

for (const film of movieDB.movies) {
    const listElement = document.createElement('li');
    listElement.classList.add('promo__interactive-item');
    listElement.textContent = film;
    newMoviesList.append(listElement);
}

while(moviesList.firstChild) {
    moviesList.firstChild.remove();
}

moviesList.append(newMoviesList);

for (let i = 0; i <  moviesList.children.length; i++) {
    moviesList.children[i].insertAdjacentText("afterbegin", i + 1 + '. ');
}