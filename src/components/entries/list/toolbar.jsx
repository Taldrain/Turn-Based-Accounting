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
    const numSelected = this.props.selected.length;

    if (numSelected === 1) {
      return (
        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={16}>
          <Grid item>
            <Button variant="raised" onClick={() => this.props.edit(this.props.selected[0])}>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="raised" onClick={() => this.props.delete(this.props.selected)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      );
    } else if (numSelected > 1) {
      return (
        <div>
          <Button variant="raised" onClick={() => this.props.delete(this.props.selected)}>
            Delete
          </Button>
        </div>
      );
    }

    return (
      <IconButton aria-label="add entry" onClick={this.props.add}>
        <AddIcon />
      </IconButton>
    );
  }

  render() {
    const { classes, selected } = this.props;
    const numSelected = selected.length;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title">
              {this.props.title}
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
