import React, { Component } from 'react';

import './style.css';

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };

    this.onUpdateSearch = this.onUpdateSearch.bind(this);
  }

  onUpdateSearch(evt) {
    const term = evt.target.value;
    this.setState({term});
    this.props.onUpdateSearch(term);
  }

  render() {
    return (
      <input
        className='form-control search-input'
        type='text'
        placeholder='Notes search'
        value={this.state.term}
        onChange={this.onUpdateSearch}
      />
    )
  }
}