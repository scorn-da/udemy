import react, { Component } from 'react';

export class FetchService extends Component {
  constructor(props) {
    super(props);
    this._apiBase = 'https://anapioficeandfire.com/api';
  }

  async getResources(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if(!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllItems() {
    return this.getResources('/characters?page=5&pageSize=10');
  }

  getItemById(id) {
    return this.getResources(`/characters/${id}`);
  }
}