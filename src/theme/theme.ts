 // Define color types using an enum for better type safety
enum Color {
  PrimaryDark = '#202041',
  PrimaryLight = '#F8F3EE',

  White = '#ffffff',
  Black = '#000000',

  SecondaryDark = '#E9A45B',

  TextPrimaryDark = '#F8F3EE', // Light text for dark mode
  TextPrimaryLight = '#1B1D44', // Dark text for light mode

  TextSecondary = '#585F75',
  TextThird = '#CDCFD6',
  TextWhite = '#ffffff',

  Danger = '#e74c3c',
  Warning = '#f1c40f',
  Success = '#2ecc71',
}

// Define font sizes, spacing, and border radius
type FontSize = 10 | 12 | 14 | 16 | 18 | 22 | 24 | 26 | 28 | 32 | 40;
type Spacing = 4 | 8 | 12 | 16 | 20 | 24 | 28;
type BorderRadius = 4 | 8 | 12 | 32;
type FontWeights = 400 | 'normal' | 'bold' | '800' | '900';

// Define the structure of the theme
interface ThemeStructure {
  isDark: boolean; // Flag to check if theme is dark or light
  isDarkString:String;
  colors: {
    primary: Color;
    background: Color;
    textPrimary: Color;
    textSecondary: Color;
    textThird: Color;
    white: Color;
    danger: Color;
    warning: Color;
    success: Color;
  };
  fonts: {
    h1: FontSize;
    h2: FontSize;
    t1: FontSize;
    t2: FontSize;
    t3: FontSize;
    b1: FontSize;
    b2: FontSize;
    b3: FontSize;
    b4: FontSize;
    spam: FontSize;
    p: FontSize;
  };
  spacing: {
    xs: Spacing;
    sm: Spacing;
    md: Spacing;
    lg: Spacing;
    xl: Spacing;
    xxl: Spacing;
  };
  borderRadius: {
    small: BorderRadius;
    medium: BorderRadius;
    large: BorderRadius;
    extraLarge: BorderRadius;
  };
  fontWeights: {
    light: FontWeights;
    normal: FontWeights;
    bold: FontWeights;
    extraBold: FontWeights;
    exExtraBold: FontWeights;
  };
}

// Define light theme
const lightTheme: ThemeStructure = {
  isDark: false,
  isDarkString:'false',
  colors: {
    primary: Color.PrimaryLight,
    background: Color.White,
    textPrimary: Color.TextPrimaryLight,
    textSecondary: Color.TextSecondary,
    textThird: Color.TextThird,
    white: Color.White,
    danger: Color.Danger,
    warning: Color.Warning,
    success: Color.Success,
  },
  fonts: {
    h1: 40,
    h2: 32,
    t1: 28,
    t2: 26,
    t3: 24,
    b1: 22,
    b2: 18,
    b3: 16,
    b4: 14,
    spam: 12,
    p: 10,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    extraLarge: 32,
  },
  fontWeights: {
    light: 400,
    normal: 'normal',
    bold: 'bold',
    extraBold: '800',
    exExtraBold: '900',
  },
};

// Define dark theme
const darkTheme: ThemeStructure = {
  isDark: true,
  isDarkString:'true',
  colors: {
    primary: Color.PrimaryDark,
    background: Color.Black,
    textPrimary: Color.TextPrimaryDark,
    textSecondary: Color.TextSecondary,
    textThird: Color.TextThird,
    white: Color.White,
    danger: Color.Danger,
    warning: Color.Warning,
    success: Color.Success,
  },
  fonts: lightTheme.fonts,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  fontWeights: lightTheme.fontWeights,
};

// Export themes
export { lightTheme, darkTheme };
export type Theme = ThemeStructure;