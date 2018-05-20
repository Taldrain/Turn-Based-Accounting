import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
    error: red,
  },
});
