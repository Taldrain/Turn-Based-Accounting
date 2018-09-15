import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { connect } from 'react-redux';

import { updateCurrency } from '../../actions/index';
import { pushSettingsCurrency } from '../../firebase/firestore';

const CURRENCIES = [
  { display: '€ - Euro', value: 'EUR' },
  { display: '$ - US Dollar', value: 'USD' },
  { display: '¥ - Yen', value: 'JPY' },
  { display: '¥ - Yuan Renminbi', value: 'CNY' },
  { display: '₩ - Won', value: 'KRW' },
];

function getCurrencyDisplay(currency) {
  return CURRENCIES.find(i => i.value === currency).display;
}

function mapStateToProps(state) {
  return ({
    currency: state.settings.currency,
  });
}

class CurrencySelect extends React.Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
    };

    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickListItem(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuItemClick(currency) {
    const { store } = this.context;

    store.dispatch(updateCurrency(currency));
    pushSettingsCurrency(currency);
    this.setState({ anchorEl: null });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { currency } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="currency-menu"
            aria-label="Currency"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={`Currency: ${getCurrencyDisplay(currency)}`}
            />
          </ListItem>
        </List>
        <Menu
          id="currency-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {CURRENCIES.map(c => (
            <MenuItem
              key={c.value}
              selected={c.value === currency}
              onClick={() => this.handleMenuItemClick(c.value)}
            >
              {c.display}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

CurrencySelect.propTypes = {
  currency: PropTypes.string.isRequired,
};

CurrencySelect.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(CurrencySelect);
