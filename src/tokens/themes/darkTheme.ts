import type { Theme } from '../types';
import { baseTheme } from './baseTheme';

/**
 * Темная тема
 * Расширяет базовую тему, добавляя темную цветовую палитру
 */
export const darkTheme = {
  ...baseTheme,
  palette: {
    primary: {
      main: '#6eb3e0',
      hover: '#85c4ed',
      active: '#5a9fd4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#65a8d2',
      hover: '#b8c88a',
      active: '#96a85e',
      contrastText: '#0a0a0a',
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
      primary: '#ffffff',
      secondary: '#e6e6e6',
      disabled: '#6b6b6b',
    },
    background: {
      default: '#0a0a0a',
      accent: '#141414',
      paper: '#1a1a1a',
    },
    border: {
      default: '#404040',
      subtle: '#2a2a2a',
      strong: '#525252',
    },
  },
} satisfies Theme;

