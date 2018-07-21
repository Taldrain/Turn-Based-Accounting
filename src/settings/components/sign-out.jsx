import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Grid,
} from '@material-ui/core';

import { signOut } from '../../firebase/auth';

class SignOut extends React.Component {
  constructor() {
    super();

    this.state = {
      userAsSignedOut: false,
    };

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    signOut()
      .then(() => this.setState({ userAsSignedOut: true }));
  }

  render() {
    const res = this.state.userAsSignedOut ? (
      <Redirect to="/login" />
    ) : (
      <Grid container direction="column" justify="center" alignItems="flex-end">
        <Grid item>
          <Button variant="raised" onClick={this.handleSignOut}>
            Sign out
          </Button>
        </Grid>
      </Grid>
    );

    return res;
  }
}

export default SignOut;
