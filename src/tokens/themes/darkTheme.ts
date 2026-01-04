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
      primary: '#fafafa',
      secondary: '#a3a3a3',
      disabled: '#525252',
    },
    background: {
      default: '#171717',
      accent: '#212121',
      paper: '#262626',
    },
    border: {
      default: '#404040',
      subtle: '#262626',
      strong: '#525252',
    },
  },
} satisfies Theme;

