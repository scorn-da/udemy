import React from 'react';

import './style.css';

import PostListItem from '../post-list-item';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

  const elements = posts.map((post) => {
    const {id, ...postProps} = post;
    return (
      <li key={id} className='list-group-item'>
        <PostListItem
          {...postProps}
          onDelete={() => onDelete(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleLiked={() => onToggleLiked(id)}/>
      </li>
    )
  });

  return (
    <ul className='app-list list-group'>
      {elements}
    </ul>
  )
};

export default PostList;