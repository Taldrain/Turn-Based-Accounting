import React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';

const SwitchLocale = require('./components/switch-locale.jsx');
const SwitchCurrency = require('./components/switch-currency.jsx');
const TextDisplay = require('../components/display/text.jsx');

const styles = {
  root: {
    paddingTop: '16px',
  },
};

function Settings() {
  return (
    <Grid container direction="row" justify="center" align="center" style={styles.root}>
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <Typography type="title">
              <TextDisplay value="settings.Title" />
            </Typography>
          </CardContent>
          <List>
            <SwitchLocale />
            <SwitchCurrency />
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

module.exports = Settings;
