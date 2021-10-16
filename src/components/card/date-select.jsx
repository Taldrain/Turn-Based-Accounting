import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import PreviousIcon from '@mui/icons-material/KeyboardArrowLeft';
import NextIcon from '@mui/icons-material/KeyboardArrowRight';

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
          <Grid container direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
            <Grid item>
              <TypeMenu
                id="date-select-type-menu"
                onChange={value => this.onNewType(value)}
                disabledTypes={disabledTypes}
                type={type}
              />
            </Grid>
            <Grid item>
              <DateDisplay date={date} type={type} variant="subtitle1" />
            </Grid>
            <Grid item>
              <IconButton
                component={Link}
                to={`/${path}/${type}/${previousDate(date, type)}`}
                aria-label="previous date"
                size="large"
              >
                <PreviousIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                component={Link}
                to={`/${path}/${type}/${nextDate(date, type)}`}
                aria-label="next date"
                size="large"
              >
                <NextIcon />
              </IconButton>
            </Grid>
            <Grid item>
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
