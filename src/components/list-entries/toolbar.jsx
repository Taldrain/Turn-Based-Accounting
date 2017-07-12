import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const TextDisplay = require('../display/text.jsx');

const styles = {
  title: {
    flex: '0 0 auto',
  },
  spacer: {
    flex: '1 1 100%',
  },
};

function ToolBar(props) {
  return (
    <Toolbar>
      <div style={styles.title}>
        {props.selected.length > 0
          ? (
            <Typography type="subheading">
              {props.selected.length}&nbsp;
              <TextDisplay value="entries.selected" />
            </Typography>
          ) : (
            <Typography type="title">
              <TextDisplay value={props.title} />
            </Typography>
          )
        }
      </div>
      <div style={styles.spacer} />
      {props.selected.length > 0
        ? (
          <IconButton color="accent" onClick={ev => props.onDelete(ev, props.selected)}>
            <DeleteIcon />
          </IconButton>
        )
        : props.addDialogChild
      }
    </Toolbar>
  );
}

ToolBar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  addDialogChild: PropTypes.node.isRequired,
};

module.exports = ToolBar;
