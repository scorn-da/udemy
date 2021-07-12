export default class FetchService {
  constructor() {
    this._apiBase = 'https://anapioficeandfire.com/api';
  }

  async getResources(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  async getAllCharacters() {
    const res = await this.getResources('/characters?page=5&pageSize=10');
    return res.map(this._updateCharacter);
  }

  async getCharacterById(id) {
    const char = await this.getResources(`/characters/${id}`);
    return this._updateCharacter(char);
  }

  getAllHousesInfo() {
    return this.getResources(`/houses/`);
  }

  getHouseInfo(id) {
    return this.getResources(`/houses/${id}/`);
  }

  getAllBooks() {
    return this.getResources(`/books/`);
  }

  getBook(id) {
    return this.getResources(`/books/${id}`);
  }

  _getItemInfo(item) {

  }

  _updateCharacter(char) {
    return {
      name: char.name || 'no data :(',
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
    }
  }

  _updateHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    }
  }

  _updateBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released,
    }
  }
}