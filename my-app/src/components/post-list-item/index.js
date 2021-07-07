import React, { Component } from 'react';

import './style.css';

export default class PostListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isImportant: false,
      isLiked: false
    };

    this.onClickImportant = this.onClickImportant.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
  }

  onClickImportant() {
    this.setState(({isImportant}) => ({
      isImportant: !isImportant
    }))
  };

  onClickLike() {
    this.setState(({isLiked}) => ({
      isLiked: !isLiked
    }))
  };

  render() {
    const { label, onDelete } = this.props;
    const { isImportant, isLiked } = this.state;

    let classNames = 'app-list-item d-flex justify-content-between';

    if(isImportant) {
      classNames += ' important';
    }

    if(isLiked) {
      classNames += ' like';
    }

    return (
      <div className={classNames}>
        <span
          className='app-list-item-label'
          onClick={this.onClickLike}
        >
          {label}
        </span>
        <div className='d-flex justify-content-center align-items-center'>
          <button
            className='btn-star btn-sm'
            type='button'
            onClick={this.onClickImportant}
          >
            <i className='fa fa-star' />
          </button>
          <button
            className='btn-trash btn-sm'
            type='button'
            onClick={onDelete}
          >
            <i className='fa fa-trash' />
          </button>
          <i className='fa fa-heart' />
        </div>
      </div>
    );
  };
}
