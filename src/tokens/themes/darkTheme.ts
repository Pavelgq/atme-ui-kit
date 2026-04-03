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
      main: '#e8855a',
      hover: '#f5a07a',
      active: '#c96b40',
      contrastText: '#0f1015',
    },
    secondary: {
      main: '#8890a8',
      hover: '#a0a8c0',
      active: '#707888',
      contrastText: '#0f1015',
    },
    error: {
      main: '#f06858',
      hover: '#f88878',
      active: '#d84838',
      contrastText: '#0f1015',
    },
    warning: {
      main: '#f0a830',
      hover: '#f8c050',
      active: '#d08820',
      contrastText: '#0f1015',
    },
    success: {
      main: '#5ab888',
      hover: '#78d0a0',
      active: '#409868',
      contrastText: '#0f1015',
    },
    text: {
      primary: '#e8e4dc',
      secondary: '#8890a8',
      disabled: '#4a5068',
    },
    background: {
      default: '#0f1015',
      accent: '#1f2230',
      paper: '#17191f',
    },
    border: {
      default: '#2c3048',
      subtle: '#1e2238',
      strong: '#404868',
    },
  },
} satisfies Theme;

