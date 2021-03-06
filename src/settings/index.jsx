import React from 'react';
import {
  Grid,
} from '@material-ui/core';

import PageHeader from '../components/display/page-header';
import PageTitle from '../components/display/page-title';

import CurrencySelect from './components/currency-select';
import SettingsUpdateSnackBar from './components/settings-update-snackbar';

function Settings() {
  return (
    <div>
      <PageHeader>
        <PageTitle>Settings</PageTitle>
      </PageHeader>
      <Grid container direction="column" justify="center" alignItems="stretch" spacing={2}>
        <Grid item>
          <CurrencySelect />
        </Grid>
      </Grid>
      <SettingsUpdateSnackBar />
    </div>
  );
}

export default Settings;
