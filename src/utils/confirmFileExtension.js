const confirmFileExtension = file => {
  // jpg, jpeg, png, gif, bmp 이미지파일의 확장자
  if (file.indexOf('.') < 0) return false;
  const reg = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;

  if (file.match(reg)) return true;
  return false;
};

export default confirmFileExtension;
