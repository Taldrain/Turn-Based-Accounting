import React from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItem, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux';

import TextDisplay from '../../components/display/text';

import { updateCurrency as updateCurrencyAction } from '../../actions/index';
import { updateCurrency as updateCurrencyDB } from '../../firebase/database';

function mapStateToProps(state) {
  return ({
    currency: state.currency,
  });
}

class SwitchCurrency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: undefined,
      currency: props.currency,
    };

    this.currencyList = ['€', '$', '¥'];

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currency !== this.state.currency) {
      this.setState({ currency: nextProps.currency });
    }
  }

  handleClick(e) {
    this.setState({ open: true, anchorEl: e.currentTarget });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleClickMenu(currency) {
    this.context.store.dispatch(updateCurrencyAction(currency));
    updateCurrencyDB(currency);
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <ListItem
          button
          aria-haspopup="true"
          aria-owns="switch-currency"
          aria-label="Language"
          onClick={this.handleClick}
        >
          <ListItemText
            primary={<TextDisplay value="settings.Switch currency" />}
            secondary={<TextDisplay value="settings.No conversion is done" />}
          />
        </ListItem>
        <Menu
          id="switch-currency"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
        >
          {this.currencyList.map(currency =>
            (
              <MenuItem
                key={currency}
                selected={currency === this.state.currency}
                onClick={() => this.handleClickMenu(currency)}
              >
                { currency }
              </MenuItem>
            ))}
        </Menu>
      </div>
    );
  }
}

SwitchCurrency.propTypes = {
  currency: PropTypes.string.isRequired,
};

SwitchCurrency.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SwitchCurrency);
