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

export { postUser, fetchUsers, deleteUser };
