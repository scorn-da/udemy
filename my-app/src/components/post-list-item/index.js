import React, {Component} from 'react';

import './style.css';

export default class PostListItem extends Component {

  render() {
    const {label, onDelete, onToggleImportant, onToggleLiked, isLiked, isImportant} = this.props;
    let classNames = 'app-list-item d-flex justify-content-between';

    if (isImportant) {
      classNames +=' important';
    }

    if (isLiked) {
      classNames +=' like';
    }

    return (
      <div className={classNames}>
        <span
          className='app-list-item-label'
          onClick={onToggleLiked}>
            {label}
        </span>
        <div className='d-flex justify-content-center align-items-center'>
          <button
            type='button'
            className='btn-star btn-sm'
            onClick={onToggleImportant}>
            <i className='fa fa-star' />
          </button>
          <button
            type='button'
            className='btn-trash btn-sm'
            onClick={onDelete}>
            <i className='fa fa-trash' />
          </button>
          <i className='fa fa-heart' />
        </div>
      </div>
    )
  }
}