import { createMuiTheme } from '@material-ui/core/styles';

import { getPalette } from './utils/colors';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    allVariants: {
      letterSpacing: 0,
    },
  },
  palette: getPalette(),
});
