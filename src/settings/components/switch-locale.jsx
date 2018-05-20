import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';

import TextDisplay from '../../components/display/text';

import { updateLocale as updateLocaleAction } from '../../actions/index';
import { updateLocale as updateLocaleDB } from '../../firebase/database';
import { localeList } from '../../utils/l10n';

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

    this.localeList = localeList();

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
    this.context.store.dispatch(updateLocaleAction(locale));
    updateLocaleDB(locale);
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
          onClose={this.handleClose}
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
            ))}
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

export default connect(mapStateToProps)(SwitchLocale);
