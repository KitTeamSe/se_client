import common from './common';
import color, { light, dark } from './colors';
import sizes from './sizes';

const { size, sizeQuery } = sizes;

const theme = type => ({
  size,
  sizeQuery,
  common,
  color,
  themeColor: type === 'LIGHT' ? light : dark
});

export default theme;
