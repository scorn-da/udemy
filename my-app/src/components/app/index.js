import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './style.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { label: 'It\'s simply', isImportant: false, id: 1 },
        { label: 'My first note', isImportant: true, id: 2 },
      ]
    };

    this.deletePost = this.deletePost.bind(this);
    this.addPost = this.addPost.bind(this);

    this.maxId = 4;
  }

  deletePost(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

      return {
        data: newArr
      }
    })
  }

  addPost(body) {
    const newItem = {
      label: body,
      isImportant: false,
      id: this.maxId++
    };

    this.setState(({data}) => {
      const newArr = [...data, newItem];

      return {
        data: newArr
      }
    });
  }

  render() {
    return (
      <div className='app'>
        <AppHeader />
        <div className='search-panel d-flex'>
          <SearchPanel />
          <PostStatusFilter />
        </div>
        <PostList
          posts={this.state.data}
          onDelete={ this.deletePost }
        />
        <PostAddForm
          onAdd={ this.addPost }
        />
      </div>
    );
  }
};