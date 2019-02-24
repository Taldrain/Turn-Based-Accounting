import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3,
  },
});

function PageHeader({ classes, children }) {
  return (
    <div className={classes.root}>
      { children }
    </div>
  );
}

PageHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,

  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default withStyles(styles)(PageHeader);
