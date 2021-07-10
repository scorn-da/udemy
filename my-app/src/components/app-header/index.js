import React from 'react';

import './style.css';

const AppHeader = ({ liked, allPosts }) => {
  return (
   <div className='app-header d-flex'>
     <h1>Your diary</h1>
     <b>{allPosts} notes, liked {liked}</b>
   </div>
  );
};

export default AppHeader;