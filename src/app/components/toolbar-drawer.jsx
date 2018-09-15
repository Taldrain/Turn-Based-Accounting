import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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

const DRAWER_WIDTH = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    minHeight: '100%',
  },
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit / 2,
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
    const { mobileOpen } = this.state;
    this.setState({ mobileOpen: !mobileOpen });
  }

  handleDrawerClose() {
    this.setState({ mobileOpen: false });
  }

  render() {
    const { classes, location } = this.props;
    const { mobileOpen } = this.state;

    const title = pageToTitle(location.pathname);

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Typography className={classes.title} variant="title" color="inherit">
            Turn-Based Accounting
          </Typography>
        </div>
        <Divider />
        <List>
          <DrawerLink to="/bilan/" text="Bilan" onClick={this.handleDrawerClose} />
          <DrawerLink to="/global" text="Global" onClick={this.handleDrawerClose} />
          <DrawerLink to="/settings" text="Settings" onClick={this.handleDrawerClose} />
        </List>
      </div>
    );

    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              { title }
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
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

export default withStyles(styles)(withRouter(ToolBarDrawer));
