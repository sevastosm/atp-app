import { axiosInstance, createMessage } from './helpers';

const host = 'http://localhost:6001/users';

const fetchUsers = async () => {
  return axiosInstance.get(host);
};

const postUser = (data, setMessage, id = null) => {
  createMessage(setMessage);
  if (id) {
    return axiosInstance.patch(host + '/' + id, data);
  }
  return axiosInstance.post(host + '/new', data);
};

const deleteUser = (id, setMessage = null) => {
  createMessage(setMessage);
  return axiosInstance.delete(host + '/' + id);
};

const hostDiet = 'http://localhost:6001/diet';

const addDiet = (data, setMessage, id = null, dietId = null) => {
  createMessage(setMessage);
  if (dietId) {
    return axiosInstance.patch(hostDiet + `/${id}/${dietId}`, data);
  }
  return axiosInstance.post(hostDiet + '/new/' + id, data);
};

const getUserDiet = (id = null, setMessage = null) => {
  createMessage(setMessage);
  return axiosInstance.get(hostDiet + '/' + id);
};

export { postUser, fetchUsers, deleteUser, addDiet, getUserDiet };
