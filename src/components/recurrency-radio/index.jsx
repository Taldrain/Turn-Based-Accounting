import React from 'react';
import PropTypes from 'prop-types';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl } from 'material-ui/Form';

const TextDisplay = require('../display/text.jsx');

class RecurrencyRadio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
    };
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
          selectedValue={this.state.type}
          onChange={(ev, type) => this.props.onChange(type)}
        >
          <LabelRadio label={<TextDisplay value="date.Yearly" />} value="year" />
          <LabelRadio label={<TextDisplay value="date.Monthly" />} value="month" />
          <LabelRadio label={<TextDisplay value="date.Weekly" />} value="week" />
          <LabelRadio label={<TextDisplay value="date.Daily" />} value="day" />
        </RadioGroup>
      </FormControl>
    );
  }
}

RecurrencyRadio.propTypes = {
  type: PropTypes.oneOf(['year', 'month', 'week', 'day']).isRequired,
  onChange: PropTypes.func.isRequired,
};

module.exports = RecurrencyRadio;
