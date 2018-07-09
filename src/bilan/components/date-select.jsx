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

import { previousDate, nextDate } from '../../utils/date';

class DateSelect extends React.Component {
  onNewType(type) {
    this.props.history.push(`/bilan/${type}/${this.props.date}`);
  }

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center" spacing={16}>
        <Grid item>
          <TypeMenu
            onChange={value => this.onNewType(value)}
            type={this.props.type}
          />
        </Grid>
        <Grid item>
          <DateDisplay date={this.props.date} type={this.props.type} variant="subheading" />
        </Grid>
        <Grid item>
          <IconButton component={Link} to={`/bilan/${this.props.type}/${previousDate(this.props.date, this.props.type)}`} aria-label="previous date">
            <PreviousIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton component={Link} to={`/bilan/${this.props.type}/${nextDate(this.props.date, this.props.type)}`} aria-label="next date">
            <NextIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Button component={Link} to="/bilan/day/" aria-label="today">
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