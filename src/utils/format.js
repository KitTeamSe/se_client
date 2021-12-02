const getDateTime = createAt => {
  return {
    year: createAt[0],
    month: createAt[1],
    day: createAt[2],
    hour: createAt[3],
    minute: createAt[4],
    second: createAt[5]
  };
};

const getTimeFormat = num => {
  return num >= 10 ? num : `0${num}`;
};

const getMyDate = dateTime => {
  return `${dateTime.year}.${getTimeFormat(dateTime.month)}.${getTimeFormat(
    dateTime.day
  )}`;
};

const getMyTime = dateTime => {
  return `${dateTime.hour}:${getTimeFormat(dateTime.minute)}:${getTimeFormat(
    dateTime.second
  )}`;
};

/**
 * 게시글, 댓글 api 로 받아오는 날짜와 시간 포멧
 *
 * @param {Array} createAt [year, month, day, hour, minute, second, ...]
 * @returns {String} 날짜 및 시간
 * @returns {Object} date, time, datetime
 */

export const getFormatMyDate = createAt => {
  const myDateTime = getDateTime(createAt);

  return {
    date: getMyDate(myDateTime), // YY.MM.DD
    time: getMyTime(myDateTime), // HH:MM:SS
    datetime: `${getMyDate(myDateTime)} ${getMyTime(myDateTime)}` // YY.MM.DD HH:MM:SS
  };
};

export const getTimeForToday = (createAt, type = 'date') => {
  const NOW_TIME = 1;
  const RECENT_TIME = 60;
  const RECENT_HOUR = 24;
  const RECENT_DAY = 7;

  const today = new Date();
  const timeValue = new Date(
    createAt[0],
    createAt[1] - 1,
    createAt[2],
    createAt[3],
    createAt[4],
    createAt[5]
  );
  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );

  if (betweenTime < NOW_TIME) return '방금 전';
  if (betweenTime < RECENT_TIME) return `${betweenTime} 분 전`;
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < RECENT_HOUR) return `${betweenTimeHour} 시간 전`;
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < RECENT_DAY) return `${betweenTimeDay} 일 전`;
  return `${getFormatMyDate(createAt)[type]}`;
};

/**
 * http url 을 받아 https 로 변경
 *
 * @param {String} httpUrl
 * @returns {String} httpsUrl
 */

export const getHttpToHttps = httpUrl => {
  if (httpUrl.indexOf('https') < 0) {
    return httpUrl.replace('http', 'https');
  }
  return httpUrl;
};

/**
 * 이미지 데이터를 받아 img 태그 생성
 *
 * @param {Object} { downloadUrl, fileName }
 * @returns {String} 에디터 이미지 태그
 */

const getImageTag = ({ src, alt }) => {
  return `<img src="${src}" alt="${alt}">`;
};

export const getEditorImgTag = ({ downloadUrl, fileName }) => {
  return `<p>${getImageTag({
    src: getHttpToHttps(downloadUrl),
    alt: fileName
  })}</p>`;
};

/**
 * 에디터의 데이터를 DB 에 저장하기 위한 HTML 디코더
 *
 * @param {String} html 에디터에서 출력된 html 데이터
 * @returns {String} text
 */

export const getDecodeHTML = html => {
  if (html !== undefined && html) {
    return html
      .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
      .replaceAll('&lt;', '')
      .replaceAll('&gt;', '')
      .replaceAll('&amp;', '')
      .replaceAll('<p></p>;', '')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
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
    return text.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  }
  return text;
};
