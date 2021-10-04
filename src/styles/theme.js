const width = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440
};

const size = {
  mobile: `${width.mobile}px`,
  tablet: `${width.tablet}px`,
  desktop: `${width.desktop}px`
};

const sizeQuery = {
  mobile: `screen and (max-width: ${width.mobile - 1}px)`,
  tablet: `screen and (max-width: ${width.tablet - 1}px)`,
  desktop: `screen and (max-width: ${width.desktop - 1}px)`
};

const theme = {
  size,
  sizeQuery
};

export default theme;
