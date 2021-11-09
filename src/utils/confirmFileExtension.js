/**
 *
 * @param {String} file 파일 name
 * @returns {Boolean} 이미지 유무 확인
 */

const confirmFileExtension = file => {
  if (file.indexOf('.') < 0) return false;
  if (file.match(/(.*?)\.(jpg|jpeg|png|gif|bmp)$/)) return true;
  return false;
};

export default confirmFileExtension;
