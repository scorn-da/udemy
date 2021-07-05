import React from 'react';

import './style.css';

import PostListItem from '../post-list-item';

const PostList = ({ posts }) => {

  const elements = posts.map((post, key) => {
    return (
      <li
        className='list-group-item'
        key={key}
      >
        <PostListItem {...post} />
      </li>
    );
  });

  return (
    <ul className='app-list list-group'>
      {
        elements
      }
    </ul>
  );
};

export default PostList;