import React from 'react';

import './style.css';

const PostStatusFilter = () => {
  return (
    <div className="btn-group">
      <button
        className="btn btn-info"
        type="button"
      >
        All
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
      >
        Liked
      </button>
    </div>
  );
};

export default PostStatusFilter;