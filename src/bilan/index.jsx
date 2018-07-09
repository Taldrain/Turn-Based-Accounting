import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Balance from './components/balance';
import DateSelect from './components/date-select';
import PunctualList from '../components/punctual/list';
import RecurrentList from '../components/recurrent/list';

import { getCurrentDate, getStartDate, getEndDate } from '../utils/date';
import { listenAllRecurrentEntries, listenPunctualEntries } from '../firebase/firestore';
import { getCurrentUser } from '../firebase/auth';
import { displayedRecurrentsEntries, convertAmount } from '../utils/entry';


class Bilan extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.type === prevState.type &&
      nextProps.match.params.date === prevState.date) {
      return null;
    }

    return {
      type: nextProps.match.params.type,
      date: nextProps.match.params.date || getCurrentDate(),
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      type: props.match.params.type,
      date: props.match.params.date || getCurrentDate(),
      punctuals: [],
      recurrents: [],
    };

    this.newRecurrents = this.newRecurrents.bind(this);
    this.newPunctuals = this.newPunctuals.bind(this);
  }

  componentDidMount() {
    this.listenRecurrent();
    this.listenPunctual();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('did update');
    if (this.state.type === prevState.type &&
      this.state.date === prevState.date) {
      return;
    }

    this.listenPunctual();
  }

  componentWillUnmount() {
    if (this.unsubscribeRecurrent) {
      this.unsubscribeRecurrent();
    }

    if (this.unsubscribePunctual) {
      this.unsubscribePunctual();
    }
  }

  listenRecurrent() {
    if (this.unsubscribeRecurrent) {
      this.unsubscribeRecurrent();
    }

    this.unsubscribeRecurrent = listenAllRecurrentEntries(
      this.newRecurrents,
      getCurrentUser().uid,
    );
  }

  listenPunctual() {
    if (this.unsubscribePunctual) {
      this.unsubscribePunctual();
    }

    this.unsubscribePunctual = listenPunctualEntries(
      this.newPunctuals,
      getStartDate(this.state.date, this.state.type),
      getEndDate(this.state.date, this.state.type),
      getCurrentUser().uid,
    );
  }

  newRecurrents(entries) {
    this.setState({
      recurrents: entries,
    });
  }

  newPunctuals(entries) {
    this.setState({ punctuals: entries });
  }

  render() {
    const recurrents = displayedRecurrentsEntries(
      this.state.recurrents,
      this.state.date,
      this.state.type,
    ).map(entry => convertAmount(entry, this.state.date, this.state.type));

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={16}
      >
        <Grid item md={6} xs={12}>
          <Balance
            recurrents={recurrents}
            punctuals={this.state.punctuals}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <DateSelect date={this.state.date} type={this.state.type} />
        </Grid>
        <Grid item md={6} xs={12}>
          <RecurrentList entries={recurrents} />
        </Grid>
        <Grid item md={6} xs={12}>
          <PunctualList entries={this.state.punctuals} date={this.state.date} />
        </Grid>
      </Grid>
    );
  }
}

Bilan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      date: PropTypes.string,
      type: PropTypes.oneOf(['day', 'week', 'month', 'year']),
    }),
  }).isRequired,
};

export default Bilan;
