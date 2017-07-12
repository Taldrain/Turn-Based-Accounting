import React from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';

const Actions = require('../actions/index.js');

const GraphGlobalView = require('./components/graph-global-view.jsx');

const styles = {
  root: {
    paddingTop: '16px',
  },
};

class Global extends React.Component {
  constructor(props, context) {
    super();

    context.store.dispatch(Actions.updatePunctual(props.resolves.punctual || {}));
    context.store.dispatch(Actions.updateRecurrent(props.resolves.recurrent || {}));
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Grid container direction="row" justify="center" align="center" style={styles.root}>
        <Grid item xs={8}>
          <GraphGlobalView />
        </Grid>
      </Grid>
    );
  }
}

Global.propTypes = {
  resolves: PropTypes.shape({
    punctual: PropTypes.object,
    recurrent: PropTypes.object,
  }).isRequired,
};

Global.contextTypes = {
  store: PropTypes.object.isRequired,
};

module.exports = Global;
