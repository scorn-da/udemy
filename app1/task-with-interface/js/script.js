/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const init = () => {

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
    const promoForm = promo.querySelector('.add');
    const moviesInput = promoForm.querySelector('.adding__input');
    const trashClassname = 'delete';
    const isFilmFavorite = promoForm.querySelector('.yes');
    const isFilmFavoriteCheckbox = isFilmFavorite.previousElementSibling;
    let addingMovie;

    advertising.remove();

    promoGenre.textContent = 'Драма';

    promoBg.style.backgroundImage = "url('./img/bg.jpg')";

    const documentFragment = new DocumentFragment();

    const sortArray = (arr) => {
        arr.sort();
    };

    const createMovieListElement = (addingMovie, index) => {
        const listElement = document.createElement('li');
        listElement.classList.add('promo__interactive-item');
        listElement.textContent = `${index + 1}. ${addingMovie}`;
        const listElementTrash = document.createElement('div');
        listElementTrash.classList.add('delete');
        listElement.append(listElementTrash);
        return listElement;
    };

    const clearNodeChildren = (node) => {
        while (node.firstChild) {
            node.firstChild.remove();
        }
    };

    const placeMoviesIntoNode = (movies, nodeToPlace) => {
        sortArray(movies);

        clearNodeChildren(nodeToPlace);

        for (let i = 0; i < movies.length; i++) {
            const newMovie = createMovieListElement(movies[i], i);
            documentFragment.append(newMovie);
        }

        nodeToPlace.append(documentFragment);

        nodeToPlace.querySelectorAll(`.${trashClassname}`).forEach((btn, i) => {
            btn.addEventListener('click', (evt) => {

                console.log('Click');

                const target = evt.target;
                if (target.classList.contains(trashClassname)) {

                    target.parentElement.remove();

                    movieDB.movies.splice(i, 1);

                    placeMoviesIntoNode(movieDB.movies, moviesList);
                }
            })
        });
    };

    promoForm.addEventListener('submit', evt => {
        evt.preventDefault();
        const target = evt.target;
        addingMovie = moviesInput.value;

        if (!!addingMovie) {

            if (addingMovie.length > 21) {
                addingMovie = `${addingMovie.slice(0, 21)}...`;
            }

            if (!movieDB.movies.includes(addingMovie)) {
                movieDB.movies.push(addingMovie);
                placeMoviesIntoNode(movieDB.movies, moviesList);

                if (isFilmFavoriteCheckbox.checked) {
                    console.log('Добавляем фильм в любимые');
                }
            }

            target.reset();
        }
    });

    placeMoviesIntoNode(movieDB.movies, moviesList);
};

document.addEventListener('DOMContentLoaded', init);