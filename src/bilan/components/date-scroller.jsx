import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PreviousIcon from '@material-ui/icons/KeyboardArrowLeft';
import NextIcon from '@material-ui/icons/KeyboardArrowRight';
import { connect } from 'react-redux';

import DateTypeMenu from './date-type-menu';

import TextDisplay from '../../components/display/text';
import DateDisplay from '../../components/display/date';

import { previousDate, nextDate, isToday } from '../../utils/date';

const styles = {
  root: {
    height: '100%',
    width: '100%',
  },
  date: {
    paddingTop: '5px',
  },
};

const dateOptions = {
  day: {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  week: {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  month: {
    year: 'numeric',
    month: 'long',
  },
  year: {
    year: 'numeric',
  },
};

function mapStateToProps(state) {
  return ({
    type: state.dateType,
  });
}

class DateScroller extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      date: new Date(context.router.globals.params.date),
    };

    this.accessDay = this.accessDay.bind(this);
    this.handleClickToday = this.handleClickToday.bind(this);
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  accessDay(date) {
    this.context.router.stateService.go('bilan', { date });
    this.setState({ date });
  }

  handleClickToday() {
    this.accessDay(new Date());
  }

  handleClickPrevious() {
    this.accessDay(previousDate(this.state.date, this.props.type));
  }

  handleClickNext() {
    this.accessDay(nextDate(this.state.date, this.props.type));
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        align="center"
        spacing={40}
        style={styles.root}
      >
        <Grid item>
          <DateTypeMenu />
        </Grid>
        <Grid item>
          <Typography variant="subheading" style={styles.date}>
            <DateDisplay value={this.state.date} options={dateOptions[this.props.type]} />
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={this.handleClickPrevious} aria-label="Previous period">
            <PreviousIcon />
          </IconButton>
          <IconButton onClick={this.handleClickNext} aria-label="Next period">
            <NextIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Button onClick={this.handleClickToday} disabled={isToday(this.state.date)}>
            <TextDisplay value="date.Today" />
          </Button>
        </Grid>
      </Grid>
    );
  }
}

DateScroller.propTypes = {
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
};

DateScroller.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(DateScroller);
