import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
