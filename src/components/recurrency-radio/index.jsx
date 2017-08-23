import React from 'react';
import PropTypes from 'prop-types';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import { connect } from 'react-redux';

const TextDisplay = require('../display/text.jsx');
const i18n = require('../../utils/i18n.js');

// XXX
// check if material-ui has fixed FormControlLabel not accepting node in
// 'label' prop

function mapStateToProps(state) {
  return ({
    locale: state.locale,
  });
}

class RecurrencyRadio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      year: '',
      month: '',
      week: '',
      day: '',
    };
  }

  componentDidMount() {
    i18n.translate('date.Yearly', this.props.locale)
      .then(res => this.setState({ year: res }));

    i18n.translate('date.Monthly', this.props.locale)
      .then(res => this.setState({ month: res }));

    i18n.translate('date.Weekly', this.props.locale)
      .then(res => this.setState({ week: res }));

    i18n.translate('date.Daily', this.props.locale)
      .then(res => this.setState({ day: res }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.state.type) {
      this.setState({ type: nextProps.type });
    }
  }

  render() {
    return (
      <FormControl required>
        <FormLabel>
          <TextDisplay value="entries.Recurrency" />
        </FormLabel>
        <RadioGroup
          aria-label="recurrency"
          name="recurrency"
          value={this.state.type}
          onChange={(ev, type) => this.props.onChange(type)}
        >
          <FormControlLabel
            value="year"
            label={this.state.year}
            control={<Radio />}
          />
          <FormControlLabel
            value="month"
            label={this.state.month}
            control={<Radio />}
          />
          <FormControlLabel
            value="week"
            label={this.state.week}
            control={<Radio />}
          />
          <FormControlLabel
            value="day"
            label={this.state.day}
            control={<Radio />}
          />
        </RadioGroup>
      </FormControl>
    );
  }
}

RecurrencyRadio.propTypes = {
  type: PropTypes.oneOf(['year', 'month', 'week', 'day']).isRequired,
  onChange: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

module.exports = connect(mapStateToProps)(RecurrencyRadio);
