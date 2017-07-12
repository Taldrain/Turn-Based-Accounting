import React from 'react';
import Grid from 'material-ui/Grid';
import { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

const TextDisplay = require('../../components/display/text.jsx');

const Auth = require('../../firebase/auth.js');

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    Auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
      .catch((error) => {
        if (error) {
          this.setState({ error: true, errorMsg: error.message });
        }
      });
  }

  render() {
    const errorChild = this.state.error ? (
      <CardContent>
        <Typography>
          { this.state.errorMsg }
        </Typography>
      </CardContent>
    ) : '';

    return (
      <form onSubmit={this.handleSubmit}>
        <CardHeader title={<TextDisplay value="login.Log in" />} />
        <CardContent>
          <Grid container direction="column" justify="center" align="stretch">
            <Grid item>
              <TextField
                name="email"
                label={<TextDisplay value="login.Email" />}
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                label={<TextDisplay value="login.Password" />}
                type="password"
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
        { errorChild }
        <CardActions>
          <Button color="primary" type="submit">
            <TextDisplay value="login.Log in" />
          </Button>
        </CardActions>
      </form>
    );
  }
}

module.exports = LoginForm;
