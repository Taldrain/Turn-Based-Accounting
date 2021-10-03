import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
});

function PageTitle({ classes, children }) {
  return (
    <Typography component="h1" variant="h2" className={classes.root}>
      { children }
    </Typography>
  );
}

PageTitle.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,

  children: PropTypes.string.isRequired,
};

export default withStyles(styles)(PageTitle);
