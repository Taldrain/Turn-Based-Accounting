import React from 'react';
import Card from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import ArrowForwardIcon from 'material-ui-icons/ArrowForward';
import PersonAdd from 'material-ui-icons/PersonAdd';

const LoginForm = require('./login-form.jsx');
const SignUpForm = require('./sign-up-form.jsx');
const TextDisplay = require('../../components/display/text.jsx');

class AuthTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev, index) {
    this.setState({ index });
  }

  render() {
    return (
      <Card>
        <AppBar position="static" color="default">
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            textColor="accent"
            fullWidth
          >
            <Tab icon={<ArrowForwardIcon />} label={<TextDisplay value="login.Log in" />} />
            <Tab icon={<PersonAdd />} label={<TextDisplay value="login.Sign up" />} />
          </Tabs>
        </AppBar>
        <SwipeableViews index={this.state.index}>
          <LoginForm />
          <SignUpForm />
        </SwipeableViews>
      </Card>
    );
  }
}

module.exports = AuthTabs;
