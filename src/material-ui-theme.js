import { createMuiTheme } from '@material-ui/core/styles';

import { getPalette } from './utils/colors';

export default createMuiTheme({
  typography: {
    allVariants: {
      letterSpacing: 0,
    },
  },
  palette: getPalette(),
});
