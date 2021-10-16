import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';

const styles = theme => ({
  root: {
    position: 'fixed',
    right: '10px',
    bottom: '10px',
    color: 'rgba(98, 98, 98, 0.6)',
    zIndex: theme.zIndex.appBar + 1,
  },
});

function GitHash({ classes }) {
  return (
    <Typography variant="caption" className={classes.root}>
      {
        // eslint-disable-next-line no-undef
        __COMMIT__HASH__
      }
    </Typography>
  );
}

GitHash.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GitHash);
