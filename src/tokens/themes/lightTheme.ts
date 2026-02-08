import type { Theme } from '../types';
import { baseTheme } from './baseTheme';

export const lightTheme = {
  ...baseTheme,
  palette: {
    primary: {
      main: '#a9d0e7',
      hover: '#96c4de',
      active: '#7eb3d4',
      contrastText: '#171717',
    },
    secondary: {
      main: '#c8d69b',
      hover: '#d4e0b0',
      active: '#b8c882',
      contrastText: '#343b1b',
    },
    error: {
      main: '#ef4444',
      hover: '#f87171',
      active: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      hover: '#fbbf24',
      active: '#d97706',
    },
    success: {
      main: '#22c55e',
      hover: '#4ade80',
      active: '#16a34a',
    },
    text: {
      primary: '#24292e',
      secondary: '#5a6342',
      disabled: '#a3a3a3',
    },
    background: {
      default: '#fbfcee',
      accent: '#f6e6a5',
      paper: '#ffffff',
    },
    border: {
      default: '#c8d69b',
      subtle: '#e5e5e5',
      strong: '#5a6342',
    },
  },
} satisfies Theme;

