import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import PreviousIcon from '@material-ui/icons/KeyboardArrowLeft';
import NextIcon from '@material-ui/icons/KeyboardArrowRight';

import DateDisplay from '../../components/display/date';
import TypeMenu from '../../components/type-menu/index';

import { getCurrentDate, previousDate, nextDate } from '../../utils/date';

class DateSelect extends React.Component {
  onNewType(type) {
    const { history, date } = this.props;
    history.push(`/bilan/${type}/${date}`);
  }

  render() {
    const { type, date } = this.props;
    return (
      <Grid container direction="row" justify="center" alignItems="center" spacing={16}>
        <Grid item xs={2}>
          <TypeMenu
            onChange={value => this.onNewType(value)}
            type={type}
          />
        </Grid>
        <Grid item xs={3}>
          <DateDisplay date={date} type={type} variant="subheading" />
        </Grid>
        <Grid item xs={2}>
          <IconButton component={Link} to={`/bilan/${type}/${previousDate(date, type)}`} aria-label="previous date">
            <PreviousIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton component={Link} to={`/bilan/${type}/${nextDate(date, type)}`} aria-label="next date">
            <NextIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <Button
            component={Link}
            to="/bilan/day/"
            aria-label="today"
            disabled={date === getCurrentDate() || type !== 'day'}
          >
            Today
          </Button>
        </Grid>
      </Grid>
    );
  }
}

DateSelect.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default withRouter(DateSelect);
