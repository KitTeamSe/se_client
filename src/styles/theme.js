const size = {
  mobile: '768px',
  tablet: '992px',
  laptop: '1200px',
  desktop: '1460px'
};

const theme = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`
};

export default theme;
