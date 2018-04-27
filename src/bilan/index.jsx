import React from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Amount from '../components/amount/index';
import DateScroller from './components/date-scroller';
import RecurrentList from '../components/recurrent/list';
import PunctualList from '../components/punctual/list';

import { getPunctualRef, getRecurrentRef } from '../firebase/database';
import { formatDate } from '../utils/date';
import { updatePunctual, updateRecurrent } from '../actions/index';

const styles = {
  heightHeader: {
    height: '150px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  root: {
    width: '100%',
    marginTop: '10px',
    paddingLeft: '10px',
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
    this.enablePunctualEntries(this.props.date, this.props.type);
    this.enableRecurrentEntries(this.props.date, this.props.type);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date ||
      this.props.type !== nextProps.type) {
      this.disablePunctualEntries(this.props.date, this.props.type);
      this.enablePunctualEntries(nextProps.date, nextProps.type);

      this.filterRecurrentEntries(nextProps.date, nextProps.type);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.disablePunctualEntries(this.props.date, this.props.type);
    this.disableRecurrentEntries();
  }

  enablePunctualEntries(date, type) {
    this.callbackPunctual = getPunctualRef(date, type).on('value', snapshot =>
      this.context.store.dispatch(updatePunctual(snapshot.val() || {})));
  }

  disablePunctualEntries(date, type) {
    if (this.callbackPunctual) {
      getPunctualRef(date, type).off('value', this.callbackPunctual);
    }
  }

  enableRecurrentEntries(date, type) {
    this.callbackRecurrent = getRecurrentRef().on('value', (snapshot) => {
      this.recurrentEntries = snapshot.val() || {};
      this.filterRecurrentEntries(date, type);
    });
  }

  disableRecurrentEntries() {
    if (this.callbackRecurrent) {
      getRecurrentRef().off('value', this.callbackRecurrent);
    }
  }

  filterRecurrentEntries(date, type) {
    const res = {};
    const { startDate, endDate } = formatDate(date, type);

    Object.keys(this.recurrentEntries).forEach((i) => {
      if (this.recurrentEntries[i].startDate && this.recurrentEntries[i].startDate > endDate) {
        return;
      }

      if (this.recurrentEntries[i].endDate && this.recurrentEntries[i].endDate < startDate) {
        return;
      }

      res[i] = this.recurrentEntries[i];
    });


    this.context.store.dispatch(updateRecurrent(res));
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        align="flex-start"
        spacing={16}
        style={styles.root}
      >
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
  date: PropTypes.instanceOf(Date).isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
};

Bilan.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Bilan);
