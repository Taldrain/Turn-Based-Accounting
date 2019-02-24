import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import DrawerLink from './drawer-link';

const DRAWER_WIDTH = 230;

const styles = theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    outline: 'none',
  },
  title: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
});

function pageToTitle(page) {
  const title = page.split('/')[1];
  return title.charAt(0).toUpperCase() + title.slice(1);
}

class ToolBarDrawer extends React.Component {
  constructor() {
    super();

    this.state = {
      mobileOpen: false,
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerToggle() {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  }

  handleDrawerClose() {
    this.setState({ mobileOpen: false });
  }

  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Link className={classes.link} to="/" onClick={this.handleDrawerClose}>
            <Typography className={classes.title} variant="h6" color="inherit">
              Turn-Based Accounting
            </Typography>
          </Link>
        </div>
        <Divider />
        <List>
          <DrawerLink to="/bilan/" text="Bilan" onClick={this.handleDrawerClose} />
          <DrawerLink to="/global/" text="Global" onClick={this.handleDrawerClose} />
          <DrawerLink to="/user" text="User" onClick={this.handleDrawerClose} />
          <DrawerLink to="/settings" text="Settings" onClick={this.handleDrawerClose} />
        </List>
      </div>
    );

    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              { pageToTitle(this.props.location.pathname) }
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

ToolBarDrawer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ToolBarDrawer));
