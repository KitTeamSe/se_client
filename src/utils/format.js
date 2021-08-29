export const getFormatDate = createAt => {
  const newCreateAt = createAt.slice(0, 6);
  const date = new Date(...newCreateAt);

  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : `0${month}`;
  let day = date.getDate();
  day = day >= 10 ? day : `0${day}`;
  return `${year}년 ${month}월 ${day}일`;
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