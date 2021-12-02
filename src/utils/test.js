/**
 * 기기 환경이 모바일인지 확인
 *
 * @param {}
 * @returns {Boolean} 모바일이면 true, 아니면 false
 */

export const getIsMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 *
 * @param {String} file 파일 name
 * @returns {Boolean} 이미지 유무 확인
 */

export const confirmFileExtension = file => {
  if (file.indexOf('.') < 0) return false;
  if (file.match(/(.*?)\.(jpg|jpeg|png|gif|bmp)$/)) return true;
  return false;
};
