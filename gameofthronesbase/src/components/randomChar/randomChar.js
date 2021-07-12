import React, { Component } from 'react';
import './randomChar.css';

import fetchService from '../../services/fetchService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

  constructor({props}) {
    super(props);
    this.updateCharacter();
  }

  fetchService = new fetchService();

  state = {
    char: {},
    loading: true,
    error: false,
  };

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  };

  updateCharacter() {
    const id = Math.floor(Math.random() * 175 + 25);
    this.fetchService.getCharacterById(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render() {
    const {char, loading, error} = this.state;
    const {isRandomCharHidden} = this.props;

    const content = loading ? <Spinner/> : error ? <ErrorMessage/> : !(loading || error) ? <View char={char}/> : null;

    return (
      <div className={`random-block rounded ${isRandomCharHidden && 'hidden'}`}>
        {content}
      </div>
    );
  }
}

const View = ({char}) => {
  const {name, gender, born, culture, died} = char;

  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item d-flex justify-content-between'>
          <span className='term'>Gender </span>
          <span>{gender}</span>
        </li>
        <li className='list-group-item d-flex justify-content-between'>
          <span className='term'>Born </span>
          <span>{born}</span>
        </li>
        <li className='list-group-item d-flex justify-content-between'>
          <span className='term'>Died </span>
          <span>{died}</span>
        </li>
        <li className='list-group-item d-flex justify-content-between'>
          <span className='term'>Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  )
};
