import React, { Component } from 'react';

import './style.css';

export default class PostAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(evt) {
    this.setState({
      text: evt.target.value
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.props.onAdd(this.state.text);
    this.setState({
      text: ''
    });
  }

  render() {
    return (
      <form
        className='bottom-panel d-flex'
        onSubmit={this.onSubmit}
      >
        <input
          className='form-control new-post-label'
          type='text'
          placeholder='Enter a new note'
          onChange={this.onValueChange}
          value={this.state.text}
        />
        <button
          className='btn btn-outline-secondary'
          type='submit'
        >
          Add
        </button>
      </form>
    )
  }
}