import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import PageHeader from '../components/display/page-header';
import PageTitle from '../components/display/page-title';

import Balance from './components/balance';
import DateSelect from '../components/card/date-select';
import PunctualList from '../components/punctual/list';
import RecurrentList from '../components/recurrent/list';

import { getCurrentDate, getStartDate, getEndDate } from '../utils/date';
import { listenAllRecurrentEntries, listenPunctualEntries } from '../firebase/firestore';
import { getCurrentUser } from '../firebase/auth';
import { getDisplayedRecurrentsEntries, convertAmount } from '../utils/entry';


class Bilan extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.type === prevState.type
      && nextProps.match.params.date === prevState.date) {
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
      recurrentInProgress: false,
      punctualInProgress: false,
    };

    this.newRecurrents = this.newRecurrents.bind(this);
    this.newPunctuals = this.newPunctuals.bind(this);
  }

  componentDidMount() {
    this.listenRecurrent();
    this.listenPunctual();
  }

  componentDidUpdate(prevProps, prevState) {
    const { type, date } = this.state;
    if (type === prevState.type && date === prevState.date) {
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

    this.setState({ recurrentInProgress: true });

    this.unsubscribeRecurrent = listenAllRecurrentEntries(
      this.newRecurrents,
      getCurrentUser().uid,
    );
  }

  listenPunctual() {
    if (this.unsubscribePunctual) {
      this.unsubscribePunctual();
    }

    this.setState({ punctualInProgress: true });

    const { date, type } = this.state;

    this.unsubscribePunctual = listenPunctualEntries(
      this.newPunctuals,
      getStartDate(date, type),
      getEndDate(date, type),
      getCurrentUser().uid,
    );
  }

  newRecurrents(entries) {
    this.setState({ recurrents: entries, recurrentInProgress: false });
  }

  newPunctuals(entries) {
    this.setState({ punctuals: entries, punctualInProgress: false });
  }

  render() {
    const {
      recurrents,
      punctuals,
      recurrentInProgress,
      punctualInProgress,
      date,
      type,
    } = this.state;

    const displayedRecurrentsEntries = getDisplayedRecurrentsEntries(recurrents, date, type)
      .map(entry => convertAmount(entry, date, type));

    return (
      <div>
        <PageHeader>
          <PageTitle>Bilan</PageTitle>
        </PageHeader>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={16}
        >
          <Grid item md={6} xs={12}>
            <Balance
              recurrents={displayedRecurrentsEntries}
              punctuals={punctuals}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DateSelect path="bilan" date={date} type={type} />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={16}
        >
          <Grid item md={6} xs={12}>
            <RecurrentList
              entries={displayedRecurrentsEntries}
              inProgress={recurrentInProgress}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <PunctualList
              entries={punctuals}
              date={date}
              inProgress={punctualInProgress}
            />
          </Grid>
        </Grid>
      </div>
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
