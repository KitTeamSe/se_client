const gray = [
  '#FAFAFA', // [0]
  '#F5F5F5', // [1]
  '#EEEEEE', // [2]
  '#E0E0E0', // [3]
  '#BDBDBD', // [4]
  '#9E9E9E', // [5]
  '#616161', // [6]
  '#424242', // [7]
  '#333333', // [8]
  '#212121' // [9]
];

const black = '#000000';
const white = '#ffffff';

const color = {
  black,
  white
};

export const light = {
  mainColor: color.black,
  bgColor: color.white
};

export const dark = {
  mainColor: color.white,
  bgColor: color.black
};

export default { gray, black, white };
