import { axiosInstance, createMessage } from './helpers';
import { host } from '../config';

const fetchUsers = async () => {
  return axiosInstance.get(host + '/users');
};

const postUser = (data, setMessage, id = null) => {
  createMessage(setMessage);
  if (id) {
    return axiosInstance.patch(host + '/users/' + id, data);
  }
  return axiosInstance.post(host + '/users/new', data);
};

const deleteUser = (id, setMessage = null) => {
  createMessage(setMessage);
  return axiosInstance.delete(host + '/' + id);
};

const addDiet = (data, setMessage, id = null, dietId = null) => {
  createMessage(setMessage);
  if (dietId) {
    return axiosInstance.patch(host + `/diet/${id}/${dietId}`, data);
  }
  return axiosInstance.post(host + '/diet/new/' + id, data);
};

const getUserDiet = (id = null, setMessage = null) => {
  createMessage(setMessage);
  return axiosInstance.get(host + '/users/' + id);
};

export { postUser, fetchUsers, deleteUser, addDiet, getUserDiet };
