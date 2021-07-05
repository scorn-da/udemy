import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './style.css';

const App = () => {

  const data = [
    { label: 'It\'s simply', isImportant: false },
    { label: 'My first note', isImportant: true },
  ];

  return (
    <div className='app'>
      <AppHeader />
      <div className='search-panel d-flex'>
        <SearchPanel />
        <PostStatusFilter />
      </div>
      <PostList posts={data} />
      <PostAddForm />
    </div>
  );
};

export default App;