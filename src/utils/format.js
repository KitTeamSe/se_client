/**
 * 게시글, 댓글 api 로 받아오는 날짜와 시간 포멧
 *
 * @param {Array} createAt [year, month, day, hour, minute, second, ...]
 * @returns {String} 날짜 및 시간
 */

const getDateTime = createAt => {
  const newCreateAt = createAt.slice(0, 6);
  newCreateAt[1] -= 1;
  const date = new Date(...newCreateAt);
  return date;
};

export const getFormatDate = createAt => {
  const date = getDateTime(createAt);
  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  let day = date.getDate();

  month = month >= 10 ? month : `0${month}`;
  day = day >= 10 ? day : `0${day}`;
  return `${year}.${month}.${day}`;
};

export const getFormatTime = createAt => {
  const date = getDateTime(createAt);
  const hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  return `${hour}:${minute}:${second}`;
};

export const getTimeForToday = createAt => {
  const NOW_TIME = 1;
  const RECENT_TIME = 60;
  const RECENT_HOUR = 24;
  const RECENT_DAY = 7;

  const today = new Date();
  const timeValue = getDateTime(createAt);
  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );

  if (betweenTime < NOW_TIME) return '방금 전';
  if (betweenTime < RECENT_TIME) return `${betweenTime} 분 전`;

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < RECENT_HOUR) return `${betweenTimeHour} 시간 전`;

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < RECENT_DAY) return `${betweenTimeDay} 일 전`;

  return `${getFormatDate(createAt)}`;
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

/**
 * 기기 환경이 모바일인지 확인
 *
 * @param {}
 * @returns {Boolean} 모바일이면 true, 아니면 false
 */

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};
