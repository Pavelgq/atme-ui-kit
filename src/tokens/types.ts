export interface Palette {
  primary: {
    main: string;
    hover: string;
    active: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    hover: string;
    active: string;
    contrastText: string;
  };
  error: {
    main: string;
    hover: string;
    active: string;
  };
  warning: {
    main: string;
    hover: string;
    active: string;
  };
  success: {
    main: string;
    hover: string;
    active: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    default: string;
    accent: string;
    paper: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
  };
}

export interface Spacing {
  unit: number;
}

export interface Typography {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface Shadows {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  none: string;
}

export interface Border {
  base: string;
}
export interface BorderRadius {
  none: string;
  round: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface Transitions {
  duration: {
    fast: string;
    base: string;
    slow: string;
  };
  easing: {
    easeInOut: string;
    easeIn: string;
    easeOut: string;
  };
}

export interface ZIndex {
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export interface Theme {
  palette: Palette;
  spacing: Spacing;
  typography: Typography;
  shadows: Shadows;
  border: Border;
  borderRadius: BorderRadius;
  transitions: Transitions;
  zIndex: ZIndex;
}

