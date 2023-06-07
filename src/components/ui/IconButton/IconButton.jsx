import React from 'react';
import PropTypes from 'prop-types';
import { IconBtn } from './IconButton.styled';

const IconButton = ({ children, onClick, ...allyProps }) => (
  <IconBtn
    type="button"
    className="IconButton"
    onClick={onClick}
    {...allyProps}
  >
    {children}
  </IconBtn>
);

export default IconButton;

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};
