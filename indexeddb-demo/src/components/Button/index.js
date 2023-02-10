import React from 'react';
import './styles.css'

 // button component
const Button = ({ label, onClickButton }) => {
  return (
    <main className='container'>
      <button
        className='container__button'
        type='submit'
        onClick={onClickButton}
      >
        {label}
      </button>
    </main>
  );
};

export default Button;
