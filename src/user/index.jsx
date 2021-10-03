import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';

import PageHeader from '../components/display/page-header';
import PageTitle from '../components/display/page-title';

import UserAvatar from './components/user-avatar';
import SignOut from './components/sign-out';

import { getCurrentUser } from '../firebase/auth';

function User() {
  const user = getCurrentUser();

  if (user === null) {
    return null;
  }

  return (
    <div>
      <PageHeader>
        <PageTitle>User</PageTitle>
      </PageHeader>
      <Card>
        <CardHeader
          avatar={<UserAvatar user={user} />}
          title={user.displayName}
        />
        <CardContent>
          <Typography>
            {`Email: ${user.email}`}
          </Typography>
          <Typography>
            {`ID: ${user.uid}`}
          </Typography>

          <Grid container direction="row" justifyContent="flex-end" alignItems="center">
            <Grid item>
              <SignOut />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default User;
