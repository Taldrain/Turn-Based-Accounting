import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';

import CurrencySelect from './components/currency-select';
import SignOut from './components/sign-out';
import SettingsUpdateSnackBar from './components/settings-update-snackbar';

function Settings() {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Grid item>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                Settings
              </Typography>
              <CurrencySelect />
              <SignOut />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <SettingsUpdateSnackBar />
    </div>
  );
}

export default Settings;
