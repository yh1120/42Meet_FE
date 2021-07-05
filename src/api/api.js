import axios from 'axios';
import { getHeaders, getUserName, setTimeFormat } from '../utils/utils';

const apiUrl = 'http://42meet.kro.kr';

const unauth_instance = axios.create({
  baseURL: apiUrl,
  headers: { withCredentials: true },
});

const instance = axios.create({
  baseURL: apiUrl,
  headers: Object.assign({ withCredentials: true }, getHeaders()),
});

export const getRole = async (username) => {
  return await unauth_instance.get(`/member/${username}/role`);
};

export const getRooms = async () => {
  return await unauth_instance.get('/reservation/rooms');
};

export const getDateReservations = async (date) => {
  return await instance.get(`/reservation/list?date=${date}`);
};

export const getMyReservations = async (tag, page) => {
  let pageBlock = 10;
  if (tag === 'waiting') pageBlock = 5;
  return await instance.get(
    `/reservation/mypage/${tag}?currentPage=${page}&pageBlock=${pageBlock}`
  );
};

export const getAllReservations = async (tag, page, pageBlock) => {
  return await instance.get(
    `/reservation/admin/${tag}?currentPage=${page}&pageBlock=${pageBlock}`
  );
};

export const getAllWaitingReservations = async () => {
  return await instance.get('/reservation/admin/waiting');
};

// export const getAllReservations = async (tag) => {
//   return await instance.get(`/reservation/admin/${tag}`);
// };

export const decideReservation = async (id, result) => {
  return await instance.post('/reservation/admin/decide', {
    id: id,
    result: result,
  });
};

export const deleteReservation = async (id) => {
  return await instance.post(`/reservation/delete`, {
    id: id,
  });
};

export const registerReservation = async (userInput) => {
  return await instance.post(`/reservation/register`, {
    location: userInput.location,
    roomName: userInput.roomName,
    date: userInput.date,
    startTime: setTimeFormat(userInput.startTime, 'start'),
    endTime: setTimeFormat(userInput.endTime, 'end'),
    leaderName: getUserName(),
    department: userInput.department,
    purpose: userInput.purpose,
    title: userInput.title,
    content: 'content',
    members: userInput.members,
  });
};
