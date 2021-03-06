import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import DrawerLink from './drawer-link';

const DRAWER_WIDTH = 230;

const useStyles = makeStyles(theme => ({
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
}));

function pageToTitle(page) {
  const title = page.split('/')[1];
  return title.charAt(0).toUpperCase() + title.slice(1);
}

function ToolBarDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Link className={classes.link} to="/">
          <Typography className={classes.title} variant="h6" color="inherit">
            Turn-Based Accounting
          </Typography>
        </Link>
      </div>
      <Divider />
      <List>
        <DrawerLink to="/bilan/" text="Bilan" />
        <DrawerLink to="/global/" text="Global" />
        <DrawerLink to="/user" text="User" />
        <DrawerLink to="/settings" text="Settings" />
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
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            { pageToTitle(location.pathname) }
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true,
            }}
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

export default ToolBarDrawer;
