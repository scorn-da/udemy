
import React, {Component} from 'react';

import './style.css';


export default class PostStatusFilter extends Component {
  constructor(props) {
    super(props);
    this.buttons = [
      {name: 'all', label: 'All'},
      {name: 'like', label: 'Liked'}
    ];
  }

  render() {
    const buttons = this.buttons.map(({name, label}) => {
      const {filter, onFilterSelect} = this.props;
      const active = filter === name;
      const classname = active ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button type='button'
                className={`btn ${classname}`}
                key={name}
                onClick={() => onFilterSelect(name)}>
          {label}</button>
      )
    });

    return (
      <div className='btn-group'>
        {buttons}
      </div>
    )
  }
}