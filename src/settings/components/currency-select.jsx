import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import SimpleMenu from '../../components/selection-control/simple-menu';

import { updateCurrency } from '../../actions/index';
import { pushSettingsCurrency } from '../../firebase/firestore';

const CURRENCIES = [
  { label: '€ - Euro', key: 'EUR' },
  { label: '$ - US Dollar', key: 'USD' },
  { label: '¥ - Yen', key: 'JPY' },
  { label: '¥ - Yuan Renminbi', key: 'CNY' },
  { label: '₩ - Won', key: 'KRW' },
];

function mapStateToProps(state) {
  return ({
    currency: state.settings.currency,
  });
}

class CurrencySelect extends React.Component {
  constructor() {
    super();

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(currency) {
    this.props.dispatch(updateCurrency(currency));
    pushSettingsCurrency(currency);
  }

  render() {
    return (
      <Card>
        <CardHeader title="Currency selection" />
        <CardContent>
          <SimpleMenu
            id="currency-selection"
            value={this.props.currency}
            options={CURRENCIES}
            onSelect={currency => this.handleSelect(currency)}
          />
        </CardContent>
      </Card>
    );
  }
}

CurrencySelect.propTypes = {
  currency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(CurrencySelect);
