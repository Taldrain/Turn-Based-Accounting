import { createTheme, adaptV4Theme } from '@mui/material/styles';

import { getPalette } from './utils/colors';

export default createTheme(adaptV4Theme({
  typography: {
    allVariants: {
      letterSpacing: 0,
    },
  },
  palette: getPalette(),
}));
