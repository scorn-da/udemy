import React, { Component } from 'react';
import './errorMessage.css';
import img from './error.jpeg';

const ErrorMessage = () => {
  return (
    <>
      <img src={img} alt='Error'/>
      <span>Something went wrong</span>
    </>
  )
};

export default ErrorMessage;