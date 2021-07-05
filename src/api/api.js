import axios from 'axios';
import { getHeaders } from '../utils/utils';
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
  return await instance.get(
    `/reservation/mypage/${tag}?currentPage=${page}&pageBlock=10`
  );
};

export const getAllReservations = async (tag) => {
  return await instance.get(`/reservation/admin/${tag}`);
};
