import { theme } from '../../tailwind.config';

export const color = Object.freeze({
  black: '#1f1f1f',
  'soft-black': theme.extend.colors['soft-black'],
  white: theme.extend.colors.white,
  overlay: theme.extend.colors.overlay,
  grey: theme.extend.colors.grey,
  'dark-grey': theme.extend.colors['dark-grey'],
  'red-error': theme.extend.colors['red-error'],
  transparent: theme.extend.colors.transparent,
  'dark-blue': theme.extend.colors['dark-blue'],
  blue: theme.extend.colors.blue,
  neutral: theme.extend.colors.neutral,
  mild: theme.extend.colors.mild,
  'dark-green': theme.extend.colors['dark-green'],
  'light-green': theme.extend.colors['light-green'],
});

export const iconName = [
  'arrow-left',
  'arrow-right',
  'chevron-down',
  'chevron-up',
] as const;

export const iconSize = Object.freeze({
  12: 12,
  16: 16,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  60: 60,
  64: 64,
  20: 20,
  22: 22,
  80: 80,
  88: 88,
  100: 100,
});

export type SafeNumber = number | `${number}`;
export type TColor = keyof typeof color;
export type TIconName = typeof iconName[number];
export type TIconSize = keyof typeof iconSize;
