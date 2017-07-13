import React from 'react';
import { UIView } from '@uirouter/react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';

import MenuIcon from 'material-ui-icons/Menu';

const FontAwesomeIcon = require('../components/element/font-awesome-icon.jsx');
const TextDisplay = require('../components/display/text.jsx');
const SidebarLink = require('./components/sidebar-link.jsx');

const Actions = require('../actions/index.js');
const Auth = require('../firebase/auth.js');

const styles = {
  list: {
    width: '250px',
  },
  flex: {
    flex: 1,
  },
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

class App extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleForce = this.handleForce.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    const settings = props.resolves.settings || {};
    context.store.dispatch(Actions.updateLocale(settings.locale));
    context.store.dispatch(Actions.updateCurrency(settings.currency));
  }

  handleForce(state) {
    this.setState({ open: state });
  }

  handleToggle() {
    this.handleForce(!this.state.open);
  }

  handleClose() {
    this.handleForce(false);
  }

  handleLogout() {
    Auth.signOut()
      .then(() => this.context.router.stateService.go('login', {}, { reload: true }));
  }

  render() {
    return (
      <div>
        <AppBar position="static" >
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleToggle}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" style={styles.flex}>
              Turn-Based Accounting
            </Typography>
            <IconButton color="inherit">
              <a
                style={styles.a}
                href="https://github.com/Taldrain/Turn-Based-Accounting/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon name="github" />
              </a>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.open}
          onRequestClose={this.handleClose}
          onClick={this.handleClose}
        >
          <List disablePadding style={styles.list}>
            <ListItem button>
              <SidebarLink path="bilan">
                <ListItemText primary={<TextDisplay value="bilan.Title" />} />
              </SidebarLink>
            </ListItem>
            <ListItem button>
              <SidebarLink path="global">
                <ListItemText primary={<TextDisplay value="global.Title" />} />
              </SidebarLink>
            </ListItem>
            <ListItem button>
              <SidebarLink path="settings">
                <ListItemText primary={<TextDisplay value="settings.Title" />} />
              </SidebarLink>
            </ListItem>
            <ListItem button>
              <SidebarLink path="about">
                <ListItemText primary={<TextDisplay value="about.Title" />} />
              </SidebarLink>
            </ListItem>
            <ListItem button onClick={this.handleLogout}>
              <ListItemText primary={<TextDisplay value="login.Sign out" />} />
            </ListItem>
          </List>
        </Drawer>
        <UIView />
      </div>
    );
  }
}

App.propTypes = {
  resolves: PropTypes.shape({
    settings: PropTypes.shape({
      locale: PropTypes.string,
      currency: PropTypes.string,
    }),
  }).isRequired,
};

App.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};


module.exports = App;
