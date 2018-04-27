import React from 'react';
import PropTypes from 'prop-types';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

import TextDisplay from '../display/text';

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
          value={this.state.type}
          onChange={(ev, type) => this.props.onChange(type)}
        >
          <FormControlLabel
            value="year"
            label={<TextDisplay value="date.Yearly" />}
            control={<Radio />}
          />
          <FormControlLabel
            value="month"
            label={<TextDisplay value="date.Monthly" />}
            control={<Radio />}
          />
          <FormControlLabel
            value="week"
            label={<TextDisplay value="date.Weekly" />}
            control={<Radio />}
          />
          <FormControlLabel
            value="day"
            label={<TextDisplay value="date.Daily" />}
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
};

export default RecurrencyRadio;
