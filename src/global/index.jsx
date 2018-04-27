import React from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';

import { updatePunctual, updateRecurrent } from '../actions/index';

import GraphGlobalView from './components/graph-global-view';

const styles = {
  root: {
    paddingTop: '16px',
  },
};

class Global extends React.Component {
  constructor(props, context) {
    super();

    context.store.dispatch(updatePunctual(props.punctual));
    context.store.dispatch(updateRecurrent(props.recurrent));
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
  // eslint-disable-next-line react/forbid-prop-types
  punctual: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  recurrent: PropTypes.object,
};

Global.defaultProps = {
  punctual: {},
  recurrent: {},
};

Global.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default Global;
