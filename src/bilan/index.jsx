import React from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Amount = require('../components/amount/index.jsx');
const DateScroller = require('./components/date-scroller.jsx');
const RecurrentList = require('../components/recurrent/list.jsx');
const PunctualList = require('../components/punctual/list.jsx');

const DB = require('../firebase/database.js');

const Actions = require('../actions/index.js');

const styles = {
  heightHeader: {
    height: '150px',
    marginTop: '20px',
    marginBottom: '20px',
  },
};

function mapStateToProps(state) {
  return ({
    type: state.dateType,
  });
}

class Bilan extends React.Component {
  constructor(props) {
    super(props);

    this.callbackPunctual = undefined;
    this.callbackRecurrent = undefined;
  }

  componentDidMount() {
    this.enablePunctualEvent(this.props.resolves.date, this.props.type);
    this.enableRecurrentEvent();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resolves.date !== nextProps.resolves.date ||
      this.props.type !== nextProps.type) {
      this.disablePunctualEvent(this.props.resolves.date, this.props.type);

      this.enablePunctualEvent(nextProps.resolves.date, nextProps.type);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUmount() {
    this.disablePunctualEvent(this.props.resolves.date, this.props.type);
    this.disableRecurrentEvent();
  }

  enablePunctualEvent(date, type) {
    this.callbackPunctual = DB.getPunctualRef(date, type).on('value', snapshot =>
      this.context.store.dispatch(Actions.updatePunctual(snapshot.val() || {}))
    );
  }

  disablePunctualEvent(date, type) {
    if (this.callbackPunctual) {
      DB.getPunctualRef(date, type).off('value', this.callbackPunctual);
    }
  }

  enableRecurrentEvent() {
    this.callbackRecurrent = DB.getRecurrentRef().on('value', snapshot =>
      this.context.store.dispatch(Actions.updateRecurrent(snapshot.val() || {}))
    );
  }

  disableRecurrentEvent() {
    if (this.callbackRecurrent) {
      DB.getRecurrentRef().off('value', this.callbackRecurrent);
    }
  }

  render() {
    return (
      <Grid container direction="row" justify="space-between" align="flex-start">
        <Grid item md={6} xs={12} style={styles.heightHeader}>
          <Amount />
        </Grid>
        <Grid item md={6} xs={12} style={styles.heightHeader}>
          <DateScroller />
        </Grid>
        <Grid item md={6} xs={12}>
          <RecurrentList />
        </Grid>
        <Grid item md={6} xs={12}>
          <PunctualList />
        </Grid>
      </Grid>
    );
  }
}

Bilan.propTypes = {
  resolves: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
};

Bilan.contextTypes = {
  store: PropTypes.object.isRequired,
};

module.exports = connect(mapStateToProps)(Bilan);
