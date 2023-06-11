import React from 'react';
import './Button.css';

const Button = ({ onClick }) => {
  return (
    <button className="Button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
