export const jsonToArray = (json) => {
  const arr = [];

  for (let i in json) arr.push(json[i]);
  return arr;
};

export const range = (start, end) => {
  let arr = [];
  let length = end - start;

  for (let i = 0; i < length; i++) {
    arr[i] = start;
    start++;
  }
  return arr;
};

export const getHoursArray = () => {
  let timeArray = [];

  for (let i = 0; i < 24; i++) timeArray.push(i);
  return timeArray;
};

export const getAFewDaysLater = (days) => {
  var date = new Date();
  var dayOfMonth = date.getDate();
  date.setDate(dayOfMonth + days);
  return date;
};

export const getCookieValue = (key) => {
  let cookieKey = key + '=';
  let result = '';
  const cookieArr = document.cookie.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === ' ') cookieArr[i] = cookieArr[i].substring(1);
    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};
