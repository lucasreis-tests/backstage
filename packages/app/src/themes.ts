import React from 'react';
import {
  createUnifiedTheme,
  palettes,
  UnifiedThemeProvider,
} from '@backstage/theme';
import { ThemeBlueprint } from '@backstage/plugin-app-react';

const brand = {
  main: '#c20fb5',
  light: '#d94fd0',
  dark: '#8a0b80',
  darker: '#5e0757',
  accent: '#e680df',
};

const eqtLabLightTheme = createUnifiedTheme({
  palette: {
    ...palettes.light,
    primary: { main: brand.main, light: brand.light, dark: brand.dark },
    secondary: { main: brand.dark, light: brand.main, dark: brand.darker },
    link: brand.main,
    linkHover: brand.dark,
    navigation: {
      background: '#1a0a1f',
      indicator: brand.main,
      color: '#ffffff',
      selectedColor: brand.main,
      navItem: { hoverBackground: '#2d1235' },
      submenu: { background: '#2d1235' },
    },
    tabbar: { indicator: brand.main },
    background: { default: '#f8f5f9', paper: '#ffffff' },
    banner: {
      info: brand.main,
      error: '#E22134',
      text: '#FFFFFF',
      link: '#FFFFFF',
      warning: '#FF9800',
    },
    pinSidebarButton: { icon: brand.dark, background: brand.light },
  },
  defaultPageTheme: 'home',
  pageTheme: {
    home: { colors: [brand.darker, brand.main], shape: 'wave' },
    apis: { colors: [brand.dark, brand.light], shape: 'wave2' },
    documentation: { colors: [brand.darker, brand.dark], shape: 'wave' },
    tool: { colors: [brand.dark, brand.main], shape: 'round' },
    other: { colors: [brand.darker, brand.main], shape: 'wave' },
  },
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  components: {
    BackstageSidebar: {
      styleOverrides: {
        drawer: { borderRight: `2px solid ${brand.dark}` },
      },
    },
    BackstageHeader: {
      styleOverrides: {
        header: { boxShadow: '0 2px 8px rgba(194, 15, 181, 0.15)' },
      },
    },
    BackstageHeaderLabel: {
      styleOverrides: {
        value: { color: brand.main },
      },
    },
    BackstageItemCardHeader: {
      styleOverrides: {
        root: { backgroundImage: `linear-gradient(135deg, ${brand.darker}, ${brand.main})` },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: 8,
          textTransform: 'none' as const,
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 6 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #ede7ef',
          boxShadow: '0 1px 4px rgba(194, 15, 181, 0.06)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { color: brand.main },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: brand.main },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { '&.Mui-selected': { color: brand.main } },
      },
    },
  },
});

const eqtLabDarkTheme = createUnifiedTheme({
  palette: {
    ...palettes.dark,
    primary: { main: brand.light, light: brand.accent, dark: brand.main },
    secondary: { main: brand.main, light: brand.light, dark: brand.dark },
    link: brand.light,
    linkHover: brand.accent,
    navigation: {
      background: '#1a0a1f',
      indicator: brand.main,
      color: '#ffffff',
      selectedColor: brand.light,
      navItem: { hoverBackground: '#2d1235' },
      submenu: { background: '#2d1235' },
    },
    tabbar: { indicator: brand.light },
    background: { default: '#15091a', paper: '#1e1024' },
    banner: {
      info: brand.light,
      error: '#E22134',
      text: '#FFFFFF',
      link: '#FFFFFF',
      warning: '#FF9800',
    },
    pinSidebarButton: { icon: brand.light, background: brand.darker },
  },
  defaultPageTheme: 'home',
  pageTheme: {
    home: { colors: [brand.darker, brand.main], shape: 'wave' },
    apis: { colors: [brand.dark, brand.light], shape: 'wave2' },
    documentation: { colors: [brand.darker, brand.dark], shape: 'wave' },
    tool: { colors: [brand.dark, brand.main], shape: 'round' },
    other: { colors: [brand.darker, brand.main], shape: 'wave' },
  },
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  components: {
    BackstageSidebar: {
      styleOverrides: {
        drawer: { borderRight: `2px solid ${brand.dark}` },
      },
    },
    BackstageHeader: {
      styleOverrides: {
        header: { boxShadow: '0 2px 12px rgba(194, 15, 181, 0.25)' },
      },
    },
    BackstageHeaderLabel: {
      styleOverrides: {
        value: { color: brand.light },
      },
    },
    BackstageItemCardHeader: {
      styleOverrides: {
        root: { backgroundImage: `linear-gradient(135deg, ${brand.darker}, ${brand.main})` },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: 8,
          textTransform: 'none' as const,
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 6 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #2d1235',
          boxShadow: '0 1px 6px rgba(194, 15, 181, 0.1)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { color: brand.light },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: brand.light },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { '&.Mui-selected': { color: brand.light } },
      },
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
      Provider: ({ children }) =>
        React.createElement(UnifiedThemeProvider, {
          theme: eqtLabLightTheme,
          children,
        }),
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
      Provider: ({ children }) =>
        React.createElement(UnifiedThemeProvider, {
          theme: eqtLabDarkTheme,
          children,
        }),
    },
  },
});
