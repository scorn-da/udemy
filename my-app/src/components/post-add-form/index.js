import React from 'react';

import './style.css';

const PostAddForm = ({ onAdd }) => {
  return (
    <div className='bottom-panel d-flex'>
      <input
        className='form-control new-post-label'
        type='text'
        placeholder='Enter a new note'
      />
      <button
        className='btn btn-outline-secondary'
        type='submit'
        onClick={() => {onAdd('Hello')}}
      >
        Add the note
      </button>
    </div>
  );
};

export default PostAddForm;