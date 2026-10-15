import { createTheme } from '@mui/material/styles';
import { colors, FONT_FAMILY } from '../../constants/designTokens';

export const muiTheme = createTheme({
  palette: {
    primary: { main: colors.primary, light: colors.primary100 },
    secondary: { main: colors.secondary, dark: colors.secondary400 },
    grey: { 100: colors.grey100, 200: colors.grey200, 400: colors.grey400, 500: colors.grey500, 600: colors.grey600 },
    text: { primary: colors.grey600, secondary: colors.grey500 },
  },
  typography: {
    fontFamily: FONT_FAMILY,
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 8 },
});
