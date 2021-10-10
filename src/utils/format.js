/**
 * 게시글, 댓글 api 로 받아오는 날짜와 시간 포멧
 *
 * @param {Array} createAt [year, month, day, hour, minute, second, ...]
 * @returns {String} 날짜 및 시간
 */

export const getFormatDate = createAt => {
  const newCreateAt = createAt.slice(0, 6);
  const date = new Date(...newCreateAt);

  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : `0${month}`;
  let day = date.getDate();
  day = day >= 10 ? day : `0${day}`;
  return `${year}.${month}.${day}`;
};

export const getFormatTime = createAt => {
  const newCreateAt = createAt.slice(0, 6);
  const date = new Date(...newCreateAt);

  const hour = date.getHours();
  let minute = date.getMinutes();
  minute = minute >= 10 ? minute : `0${minute}`;
  let second = date.getSeconds();
  second = second >= 10 ? second : `0${second}`;
  return `${hour}:${minute}:${second}`;
};

/**
 * 에디터의 데이터를 DB 에 저장하기 위한 HTML 디코더
 *
 * @param {String} html 에디터에서 출력된 html 데이터
 * @returns {String} text
 */

export const getDecodeHTML = html => {
  if (html !== undefined && html) {
    const text = html
      .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
      .replaceAll('&lt;', '')
      .replaceAll('&gt;', '')
      .replaceAll('&amp;', '')
      .replaceAll('<p></p>;', '')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
    return text;
  }
  return html;
};

/**
 * DB 에서 불러온 에디터 데이터를 화면에 띄우기 위한 HTML 인코더
 *
 * @param {String} text DB에서 받아온 에디터 데이터
 * @returns {String} HTML 태그
 */

export const getEncodeHTML = text => {
  if (text !== undefined && text) {
    const html = text.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
    return html;
  }
  return text;
};
