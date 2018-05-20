import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import SwitchLocale from './components/switch-locale';
import SwitchCurrency from './components/switch-currency';
import TextDisplay from '../components/display/text';

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
            <Typography variant="title">
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

export default Settings;
