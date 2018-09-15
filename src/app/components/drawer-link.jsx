import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';

function DrawerLink(props) {
  const { onClick, to, text } = props;
  return (
    <ListItem button component={Link} to={to} onClick={onClick}>
      <ListItemText primary={text} />
    </ListItem>
  );
}

DrawerLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DrawerLink;
