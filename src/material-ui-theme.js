import { createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';
import createPalette from 'material-ui/styles/palette';


module.exports = createMuiTheme({
  palette: createPalette({
    primary: teal,
    accent: orange,
    error: red,
  }),
});
