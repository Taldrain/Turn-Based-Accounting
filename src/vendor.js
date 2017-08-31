/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { UIRouter, UIView, UISref, pushStateLocationPlugin } from '@uirouter/react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SwipeableViews from 'react-swipeable-views';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Checkbox, { LabelCheckbox } from 'material-ui/Checkbox';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import { FormLabel, FormControl, FormControlLabel, FormGroup } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import { createMuiTheme } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import purple from 'material-ui/colors/purple';
import cyan from 'material-ui/colors/cyan';
import amber from 'material-ui/colors/amber';
import orange from 'material-ui/colors/orange';
import teal from 'material-ui/colors/teal';

import AddIcon from 'material-ui-icons/Add';
import ArrowForwardIcon from 'material-ui-icons/ArrowForward';
import MenuIcon from 'material-ui-icons/Menu';
import PersonAdd from 'material-ui-icons/PersonAdd';
import PreviousIcon from 'material-ui-icons/KeyboardArrowLeft';
import NextIcon from 'material-ui-icons/KeyboardArrowRight';

import * as d3 from './d3';

require('mobile-detect');
require('font-awesome-webpack');
