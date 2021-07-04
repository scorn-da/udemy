import React from 'react';

import './style.css';

import PostListItem from '../post-list-item';

const PostList = () => {
  return (
    <ul className="app-list list-group">
      <PostListItem />
    </ul>
  );
};

export default PostList;