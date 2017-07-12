import React from 'react';
import Grid from 'material-ui/Grid';

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
          About
        </Grid>
      </Grid>
    );
  }
}

module.exports = About;
