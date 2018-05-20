import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import TextDisplay from '../components/display/text';

const styles = {
  root: {
    paddingTop: '16px',
  },
};

class About extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Grid container direction="row" justify="center" align="center" style={styles.root}>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography variant="title">
                <TextDisplay value="about.Title" />
              </Typography>
            </CardContent>
            <CardContent>
              <Typography>
                <TextDisplay value="about.Description" />
              </Typography>
              <Typography>
                <TextDisplay value="about.Type of entry" />
              </Typography>
              <Typography>
                <TextDisplay value="about.Example" />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default About;
