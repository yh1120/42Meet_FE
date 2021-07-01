import jwtDecode from 'jwt-decode';

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

export const setTimeFormat = (hour, mode = 'start') => {
  let result;

  if (mode === 'end') hour = (((hour - 1) % 23) + 24) % 24;

  if (hour < 10) {
    if (mode === 'start') result = `0${hour}:00:00`;
    else result = `0${hour}:59:59`;
  } else {
    if (mode === 'start') result = `${hour}:00:00`;
    else result = `${hour}:59:59`;
  }

  return result;
};

export const isExpiredJwt = (key) => {
  let value = localStorage.getItem(key);

  // 만료 기한이 10분 이내로 남았을 경우, true를 리턴함.
  if (new Date(jwtDecode(value).exp * 1000) - new Date() < 1200 * 600)
    return true;
  return false;
};

const req_headers = {
  'access-token': localStorage.getItem('access-token'),
};

const req_refresh_headers = {
  'access-token': localStorage.getItem('access-token'),
  'refresh-token': localStorage.getItem('refresh-token'),
};

export const getHeaders = () => {
  let headers = !isExpiredJwt('access-token')
    ? req_headers
    : req_refresh_headers;
  return headers;
};

export const setToken = (response) => {
  let access_token = response.headers['access-token'];
  let refresh_token = response.headers['refresh-token'];
  if (access_token) {
    localStorage.setItem('access-token', access_token);
    localStorage.setItem('refresh-token', refresh_token);
  }
};

export const getUserName = () => {
  return jwtDecode(localStorage.getItem('access-token')).sub;
};
