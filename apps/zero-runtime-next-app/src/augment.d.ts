import type { ExtendTheme } from '@mui/zero-runtime';

declare module '@mui/zero-runtime/theme' {
  interface ThemeTokens {
    'max-width': string;
    'border-radius': string;
    'font-mono': string;
    'foreground-rgb': string;
    'background-start-rgb': string;
    'background-end-rgb': string;
    'primary-glow': string;
    'secondary-glow': string;
    title: {
      'start-rgb': string;
      'end-rgb': string;
      border: string;
    };
    callout: {
      rgb: string;
      'border-rgb': string;
    };
    card: {
      rgb: string;
      'border-rgb': string;
    };
  }

  interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: 'light' | 'dark';
      tokens: ThemeTokens;
    }>;
  }
}
