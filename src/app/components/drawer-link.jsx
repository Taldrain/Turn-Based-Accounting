import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';

function DrawerLink({ to, text }) {
  return (
    <ListItem button component={Link} to={to}>
      <ListItemText primary={text} />
    </ListItem>
  );
}

DrawerLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default DrawerLink;
