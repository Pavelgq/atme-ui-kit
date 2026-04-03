import type { Theme } from '../types';
import { baseTheme } from './baseTheme';

export const lightTheme = {
  ...baseTheme,
  palette: {
    primary: {
      main: '#c05a30',
      hover: '#d97040',
      active: '#a04420',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#5a5e78',
      hover: '#7074a0',
      active: '#44485e',
      contrastText: '#ffffff',
    },
    error: {
      main: '#c0392b',
      hover: '#e05040',
      active: '#a02820',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#c07820',
      hover: '#d49030',
      active: '#a06010',
      contrastText: '#ffffff',
    },
    success: {
      main: '#3a8a5c',
      hover: '#4da870',
      active: '#2c6e48',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#18182a',
      secondary: '#5a5e78',
      disabled: '#9098b0',
    },
    background: {
      default: '#f8f6f2',
      accent: '#f0ece4',
      paper: '#ffffff',
    },
    border: {
      default: '#dddae8',
      subtle: '#eeebf4',
      strong: '#c8c4d8',
    },
  },
} satisfies Theme;

