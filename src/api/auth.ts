import { axiosInstance, createMessage } from './helpers';

const host = 'http://localhost:6001/auth';

export const login = (data, setMessage) => {
  createMessage(setMessage);
  return axiosInstance.post(host + '/login', data);
};
