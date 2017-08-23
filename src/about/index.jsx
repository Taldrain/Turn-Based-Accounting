import React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';

const TextDisplay = require('../components/display/text.jsx');

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
              <Typography type="title">
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

module.exports = About;
