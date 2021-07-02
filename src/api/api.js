import axios from 'axios';
import { getHeaders } from '../utils/utils';
const apiUrl = 'http://42meet.kro.kr';

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: getHeaders(),
});

export const getRole = async (username) => {
  return await instance.get(`/member/${username}/role`);
};

export const getRooms = async () => {
  return await instance.get(`/reservation/rooms`);
};

export const getReservations = async (date) => {
  return await instance.get(`/reservation/list?date=${date}`);
};
