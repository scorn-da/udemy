import React from 'react';

import './style.css';

import PostListItem from '../post-list-item';

const PostList = ({ posts, onDelete }) => {

  const elements = posts.map((post) => {
    const {id, ...postProps} = post;

    return (
      <li
        className='list-group-item'
        key={id}
      >
        <PostListItem
          {...postProps}
          onDelete={() => {
            onDelete(id)
          }}
        />
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