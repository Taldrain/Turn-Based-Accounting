import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import PreviousIcon from 'material-ui-icons/KeyboardArrowLeft';
import NextIcon from 'material-ui-icons/KeyboardArrowRight';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';

const DateTypeMenu = require('./date-type-menu.jsx');

const TextDisplay = require('../../components/display/text.jsx');
const DateDisplay = require('../../components/display/date.jsx');
const DateUtils = require('../../utils/date.js');

const styles = {
  root: {
    height: '100%',
    width: '100%',
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
    this.accessDay(DateUtils.previousDate(this.state.date, this.props.type));
  }

  handleClickNext() {
    this.accessDay(DateUtils.nextDate(this.state.date, this.props.type));
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        align="center"
        gutter={40}
        style={styles.root}
      >
        <Grid item>
          <DateTypeMenu />
        </Grid>
        <Grid item>
          <DateDisplay value={this.state.date} options={dateOptions[this.props.type]} />
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
          <Button onClick={this.handleClickToday} disabled={DateUtils.isToday(this.state.date)}>
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

module.exports = connect(mapStateToProps)(DateScroller);
