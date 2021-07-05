import React from 'react';

import './style.css';

const PostAddForm = () => {
  return (
    <form className='bottom-panel d-flex'>
      <input
        className='form-control new-post-label'
        type='text'
        placeholder='Enter a new note'
      />
      <button
        className='btn btn-outline-secondary'
        type='submit'
      >
        Add the note
      </button>
    </form>
  );
};

export default PostAddForm;