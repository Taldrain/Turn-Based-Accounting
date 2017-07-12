import React from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const AuthProvider = require('./auth-provider.jsx');

const TextDisplay = require('../../components/display/text.jsx');

const styles = {
  root: {
    marginTop: '20px',
  },
};

function AuthProviders() {
  return (
    <Card style={styles.root}>
      <CardContent>
        <Grid container direction="row" align="center" justify="space-around">
          <Grid item>
            <Typography>
              <TextDisplay value="login.Sign in with provider" />
            </Typography>
          </Grid>
          <Grid item>
            <AuthProvider icon="google" provider="google" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

module.exports = AuthProviders;
