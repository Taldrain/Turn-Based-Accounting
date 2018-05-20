import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from '../../firebase/index';
import getConfig from '../../firebase/firebaseui';

function FirebaseUILogin() {
  return (
    <Card>
      <CardContent>
        <Grid container direction="row" align="center" justify="space-around">
          <Grid item>
            <StyledFirebaseAuth uiConfig={getConfig()} firebaseAuth={firebase.auth()} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default FirebaseUILogin;
