import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Button,
} from '@material-ui/core';

import PreviousIcon from '@material-ui/icons/KeyboardArrowLeft';
import NextIcon from '@material-ui/icons/KeyboardArrowRight';

import DateDisplay from '../display/date';
import TypeMenu from '../type-menu/index';

import { getCurrentDate, previousDate, nextDate } from '../../utils/date';

const styles = {
  root: {
    height: '100%',
  },
};

class DateSelect extends React.Component {
  onNewType(type) {
    const { path, history, date } = this.props;
    history.push(`/${path}/${type}/${date}`);
  }

  render() {
    const {
      path,
      type,
      date,
      disabledTypes,
    } = this.props;

    return (
      <Card style={styles.root}>
        <CardHeader title="Date selection" />
        <CardContent>
          <Grid container direction="row" justify="center" alignItems="center" spacing={16}>
            <Grid item xs={2}>
              <TypeMenu
                id="date-select-type-menu"
                onChange={value => this.onNewType(value)}
                disabledTypes={disabledTypes}
                type={type}
              />
            </Grid>
            <Grid item xs={3}>
              <DateDisplay date={date} type={type} variant="subtitle1" />
            </Grid>
            <Grid item xs={2}>
              <IconButton component={Link} to={`/${path}/${type}/${previousDate(date, type)}`} aria-label="previous date">
                <PreviousIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <IconButton component={Link} to={`/${path}/${type}/${nextDate(date, type)}`} aria-label="next date">
                <NextIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <Button
                component={Link}
                to={`/${path}/day/`}
                aria-label="today"
                disabled={date === getCurrentDate() || type !== 'day'}
              >
                Today
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

DateSelect.propTypes = {
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
  disabledTypes: PropTypes.arrayOf(PropTypes.oneOf(['day', 'week', 'month', 'year'])),
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

DateSelect.defaultProps = {
  disabledTypes: [],
};

export default withRouter(DateSelect);
