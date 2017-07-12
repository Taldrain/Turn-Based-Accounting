import React from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItem, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux';

const TextDisplay = require('../../components/display/text.jsx');

const Actions = require('../../actions/index.js');
const DB = require('../../firebase/database.js');
const l10n = require('../../utils/l10n.js');

function mapStateToProps(state) {
  return ({
    locale: state.locale,
  });
}

function printLocale(locale) {
  if (locale === 'fr-FR') {
    return 'Français';
  }

  return 'English';
}

class SwitchLocale extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: undefined,
      locale: props.locale,
    };

    this.localeList = l10n.localeList();

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale !== this.state.locale) {
      this.setState({ locale: nextProps.locale });
    }
  }

  handleClick(e) {
    this.setState({ open: true, anchorEl: e.currentTarget });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleClickMenu(locale) {
    this.context.store.dispatch(Actions.updateLocale(locale));
    DB.updateLocale(locale);
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <ListItem
          button
          aria-haspopup="true"
          aria-owns="switch-locale"
          aria-label="Language"
          onClick={this.handleClick}
        >
          <ListItemText
            primary={<TextDisplay value="settings.Switch language" />}
            secondary={printLocale(this.state.locale)}
          />
        </ListItem>
        <Menu
          id="switch-locale"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.localeList.map(locale =>
            (
              <MenuItem
                key={locale}
                selected={locale === this.state.locale}
                onClick={() => this.handleClickMenu(locale)}
              >
                { printLocale(locale) }
              </MenuItem>
            )
          )}
        </Menu>
      </div>
    );
  }
}

SwitchLocale.propTypes = {
  locale: PropTypes.string.isRequired,
};

SwitchLocale.contextTypes = {
  store: PropTypes.object.isRequired,
};

module.exports = connect(mapStateToProps)(SwitchLocale);
