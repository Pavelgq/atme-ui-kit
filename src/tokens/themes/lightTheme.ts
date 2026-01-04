import type { Theme } from '../types';
import { baseTheme } from './baseTheme';

export const lightTheme = {
  ...baseTheme,
  palette: {
    primary: {
      main: '#0ea5e9',
      hover: '#38bdf8',
      active: '#0284c7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a855f7',
      hover: '#c084fc',
      active: '#9333ea',
      contrastText: '#ffffff',
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
      primary: '#171717',
      secondary: '#525252',
      disabled: '#a3a3a3',
    },
    background: {
      default: '#fafafa',
      accent: '#f7f1e3',
      paper: '#ffffff',
    },
    border: {
      default: '#5d5d5d',
      subtle: '#e5e5e5',
      strong: '#a3a3a3',
    },
  },
} satisfies Theme;

