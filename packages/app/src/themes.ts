import { createUnifiedTheme, palettes } from '@backstage/theme';
import { ThemeBlueprint } from '@backstage/plugin-app-react';

const eqtLabLightTheme = createUnifiedTheme({
  palette: {
    ...palettes.light,
    primary: {
      main: '#c20fb5',
      light: '#d94fd0',
      dark: '#8a0b80',
    },
    secondary: {
      main: '#c20fb5',
      light: '#d94fd0',
      dark: '#8a0b80',
    },
    navigation: {
      background: '#1a0a1f',
      indicator: '#c20fb5',
      color: '#ffffff',
      selectedColor: '#c20fb5',
      navItem: {
        hoverBackground: '#2d1235',
      },
    },
  },
  defaultPageTheme: 'home',
  pageTheme: {
    home: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'wave',
    },
    apis: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'wave2',
    },
    documentation: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'wave',
    },
    tool: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'round',
    },
    other: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'wave',
    },
  },
});

const eqtLabDarkTheme = createUnifiedTheme({
  palette: {
    ...palettes.dark,
    primary: {
      main: '#d94fd0',
      light: '#e680df',
      dark: '#c20fb5',
    },
    secondary: {
      main: '#d94fd0',
      light: '#e680df',
      dark: '#c20fb5',
    },
    navigation: {
      background: '#1a0a1f',
      indicator: '#c20fb5',
      color: '#ffffff',
      selectedColor: '#d94fd0',
      navItem: {
        hoverBackground: '#2d1235',
      },
    },
  },
  defaultPageTheme: 'home',
  pageTheme: {
    home: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'wave',
    },
    apis: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'wave2',
    },
    documentation: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'wave',
    },
    tool: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'round',
    },
    other: {
      colors: ['#8a0b80', '#c20fb5'],
      shape: 'wave',
    },
  },
});

export const eqtLabLight = ThemeBlueprint.make({
  name: 'light',
  params: {
    theme: {
      id: 'light',
      title: 'EQT Lab Light',
      variant: 'light',
      theme: eqtLabLightTheme,
    },
  },
});

export const eqtLabDark = ThemeBlueprint.make({
  name: 'dark',
  params: {
    theme: {
      id: 'dark',
      title: 'EQT Lab Dark',
      variant: 'dark',
      theme: eqtLabDarkTheme,
    },
  },
});
