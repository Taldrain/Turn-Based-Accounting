import { createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';

export default createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
    error: red,
  },
});
