import axios from 'axios';

const host = 'http://localhost:6001/users';

const fetchUsers = () => {
  return axios.get(host);
};

const postUser = (data, id) => {
  if (id) {
    return axios.patch(host + '/' + id, data);
  }
  return axios.post(host + '/new', data);
};

const deleteUser = (id) => {
  return axios.delete(host + '/' + id);
};

export { postUser, fetchUsers, deleteUser };
