import { axiosInstance, createMessage } from './helpers';

import { host } from '../config';

export const login = (data, setMessage) => {
  createMessage(setMessage);
  return axiosInstance.post(host + '/auth/login', data);
};
