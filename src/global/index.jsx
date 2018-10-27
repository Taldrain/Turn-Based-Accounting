import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

import DateSelect from '../components/card/date-select';
import TypeMenu from '../components/type-menu/index';
import Graph from '../components/d3/graph';

import { getCurrentDate, getStartDate, getEndDate } from '../utils/date';
import { listenAllRecurrentEntries, listenPunctualEntries } from '../firebase/firestore';
import { getCurrentUser } from '../firebase/auth';
import { getDisplayedRecurrentsEntries } from '../utils/entry';
import { getGreaterTypes } from '../utils/date-types';


class Global extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.type === prevState.type
      && nextProps.match.params.date === prevState.date) {
      return null;
    }

    return {
      type: nextProps.match.params.type,
      date: nextProps.match.params.date || getCurrentDate(),
      disabledDisplayTypes: getGreaterTypes(nextProps.match.params.type),
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      type: props.match.params.type,
      date: props.match.params.date || getCurrentDate(),
      displayType: 'day',
      disabledDisplayTypes: getGreaterTypes(props.match.params.type),
      punctuals: [],
      recurrents: [],
      recurrentInProgress: false,
      punctualInProgress: false,
    };

    this.newRecurrents = this.newRecurrents.bind(this);
    this.newPunctuals = this.newPunctuals.bind(this);
    this.onNewDisplayType = this.onNewDisplayType.bind(this);
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

  onNewDisplayType(displayType) {
    this.setState({ displayType });
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
      displayType,
      disabledDisplayTypes,
    } = this.state;

    const displayedRecurrentsEntries = getDisplayedRecurrentsEntries(recurrents, date, type);

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={16}
      >
        <Grid item xs={12}>
          <DateSelect path="global" date={date} type={type} disabledTypes={['day']} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Graph
              </Typography>
              <TypeMenu
                onChange={value => this.onNewDisplayType(value)}
                type={displayType}
                disabledTypes={disabledDisplayTypes}
              />
              <Graph
                punctuals={punctuals}
                recurrents={displayedRecurrentsEntries}
                inProgress={recurrentInProgress || punctualInProgress}
                date={date}
                type={type}
                displayType={displayType}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

Global.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      date: PropTypes.string,
      type: PropTypes.oneOf(['day', 'week', 'month', 'year']),
    }),
  }).isRequired,
};

export default Global;
