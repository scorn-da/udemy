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
      data : [
        {label: 'My first note', isImportant: true, isLiked: false, id: 1},
        {label: 'That\'s simply', isImportant: false, isLiked: false, id: 2},
        {label: 'Awesome', isImportant: false, isLiked: false, id: 3}
      ],
      term: '',
      filter: 'all'
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);

    this.maxId = 4;
  }

  deleteItem(id) {
    this.setState(({data}) => {
      const index = data.findIndex(post => post.id === id);

      const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

      return {
        data: newArr
      }
    });
  }

  addItem(body) {
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
    })
  }

  onToggleImportant(id) {
    this.setState(({data}) => {
      const index = data.findIndex(post => post.id === id);

      const old = data[index];
      const newItem = {...old, isImportant: !old.isImportant};

      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      return {
        data: newArr
      }
    });
  }

  onToggleLiked(id) {
    this.setState(({data}) => {
      const index = data.findIndex(post => post.id === id);

      const old = data[index];
      const newItem = {...old, isLiked: !old.isLiked};

      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      return {
        data: newArr
      }
    });
  }

  searchPost(posts, term) {
    if (term.length === 0) {
      return posts
    }

    return posts.filter((post) => {
      return post.label.indexOf(term) > -1
    });
  }

  filterPost(posts, filter) {
    switch(filter) {
      case 'like': return posts.filter(post => post.isLiked);
      case 'all': return posts;
      default: console.error('No filters chosen');
        break;
    }
  }

  onUpdateSearch(term) {
    this.setState({term})
  }

  onFilterSelect(filter){
    this.setState({filter})
  }

  render() {
    const {data, term, filter} = this.state;

    const liked = data.filter((post) => post.isLiked).length;
    const allPosts = data.length;
    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <div className='app'>
        <AppHeader
          liked={liked}
          allPosts={allPosts}
        />
        <div className='search-panel d-flex'>
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm onAdd={this.addItem} />
      </div>
    )
  }
}