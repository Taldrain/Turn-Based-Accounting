import React from 'react';
import { UIView } from '@uirouter/react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';

import MenuIcon from '@material-ui/icons/Menu';

import TextDisplay from '../components/display/text';
import SidebarLink from './components/sidebar-link';

import { updateLocale, updateCurrency } from '../actions/index';
import { signOut } from '../firebase/auth';

const styles = {
  list: {
    width: '250px',
  },
  flex: {
    flex: 1,
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

    context.store.dispatch(updateLocale(props.settings.locale));
    context.store.dispatch(updateCurrency(props.settings.currency));
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
    signOut()
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
            <Typography variant="title" color="inherit" style={styles.flex}>
              Turn-Based Accounting
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.open}
          onClose={this.handleClose}
          onClick={this.handleClose}
        >
          <List padding="none" style={styles.list}>
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
  settings: PropTypes.shape({
    locale: PropTypes.string,
    currency: PropTypes.string,
  }),
};

App.defaultProps = {
  settings: {},
};

App.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};


export default App;
