import React from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Amount = require('../components/amount/index.jsx');
const DateScroller = require('./components/date-scroller.jsx');
const RecurrentList = require('../components/recurrent/list.jsx');
const PunctualList = require('../components/punctual/list.jsx');

const DB = require('../firebase/database.js');
const DateUtils = require('../utils/date.js');
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

    this.recurrentEntries = {};
  }

  componentDidMount() {
    this.enablePunctualEntries(this.props.resolves.date, this.props.type);
    this.enableRecurrentEntries(this.props.resolves.date, this.props.type);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resolves.date !== nextProps.resolves.date ||
      this.props.type !== nextProps.type) {
      this.disablePunctualEntries(this.props.resolves.date, this.props.type);
      this.enablePunctualEntries(nextProps.resolves.date, nextProps.type);

      this.filterRecurrentEntries(nextProps.resolves.date, nextProps.type);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.disablePunctualEntries(this.props.resolves.date, this.props.type);
    this.disableRecurrentEntries();
  }

  enablePunctualEntries(date, type) {
    this.callbackPunctual = DB.getPunctualRef(date, type).on('value', snapshot =>
      this.context.store.dispatch(Actions.updatePunctual(snapshot.val() || {}))

    );
  }

  disablePunctualEntries(date, type) {
    if (this.callbackPunctual) {
      DB.getPunctualRef(date, type).off('value', this.callbackPunctual);
    }
  }

  enableRecurrentEntries(date, type) {
    this.callbackRecurrent = DB.getRecurrentRef().on('value', (snapshot) => {
      this.recurrentEntries = snapshot.val() || {};
      this.filterRecurrentEntries(date, type);
    });
  }

  disableRecurrentEntries() {
    if (this.callbackRecurrent) {
      DB.getRecurrentRef().off('value', this.callbackRecurrent);
    }
  }

  filterRecurrentEntries(date, type) {
    const res = {};
    const { startDate, endDate } = DateUtils.formatDate(date, type);

    Object.keys(this.recurrentEntries).forEach((i) => {
      if (this.recurrentEntries[i].startDate && this.recurrentEntries[i].startDate > endDate) {
        return;
      }

      if (this.recurrentEntries[i].endDate && this.recurrentEntries[i].endDate < startDate) {
        return;
      }

      res[i] = this.recurrentEntries[i];
    });


    this.context.store.dispatch(Actions.updateRecurrent(res));
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
