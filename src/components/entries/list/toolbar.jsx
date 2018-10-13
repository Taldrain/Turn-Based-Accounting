import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
});


class ListToolbar extends React.Component {
  getButtons() {
    const {
      selected,
      add,
      edit,
      delete: deleteFn,
    } = this.props;

    const numSelected = selected.length;

    if (numSelected === 1) {
      return (
        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={16}>
          <Grid item>
            <Button variant="contained" onClick={() => edit(selected[0])}>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => deleteFn(selected)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      );
    }

    if (numSelected > 1) {
      return (
        <div>
          <Button variant="contained" onClick={() => deleteFn(selected)}>
            Delete
          </Button>
        </div>
      );
    }

    return (
      <IconButton aria-label="add entry" onClick={add}>
        <AddIcon />
      </IconButton>
    );
  }

  render() {
    const { classes, selected, title } = this.props;
    const numSelected = selected.length;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {`${numSelected} selected`}
            </Typography>
          ) : (
            <Typography variant="h6">
              { title }
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        { this.getButtons() }
      </Toolbar>
    );
  }
}

ListToolbar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};

export default withStyles(styles)(ListToolbar);
