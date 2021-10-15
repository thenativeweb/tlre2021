import { createTheme } from '@mui/material';
import { Theme } from './Theme';

const MuiTheme = createTheme({
  palette: {
    background: {
      default: Theme.colors.background
    }
  }
});

export {
  MuiTheme
};
