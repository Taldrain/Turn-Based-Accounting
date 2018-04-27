import React from 'react';
import PropTypes from 'prop-types';
import Radio from 'material-ui/Radio';
import Grid from 'material-ui/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

class BalanceRadio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: props.balance,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.balance !== this.state.balance) {
      this.setState({ balance: nextProps.balance });
    }
  }

  handleChange(ev) {
    const balance = ev.currentTarget.value;

    this.props.onChange(balance);
  }

  render() {
    return (
      <Grid container direction="row" justify="space-around" align="center">
        <Grid item>
          <Radio
            checked={this.state.balance === 'positif'}
            onChange={this.handleChange}
            value="positif"
          />
          <AddIcon />
        </Grid>
        <Grid item>
          <Radio
            checked={this.state.balance === 'negatif'}
            onChange={this.handleChange}
            label="-"
            value="negatif"
          />
          <RemoveIcon />
        </Grid>
      </Grid>
    );
  }
}

BalanceRadio.propTypes = {
  balance: PropTypes.oneOf(['positif', 'negatif']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BalanceRadio;
