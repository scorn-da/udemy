import React from 'react';

import './style.css';

const SearchPanel = () => {
  return (
    <input
      className='form-control search-input'
      type='text'
      placeholder='Notes search'
    />
  );
};

export default SearchPanel;