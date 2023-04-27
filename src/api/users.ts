import axios from 'axios';

const host = 'http://localhost:6001/users';

const fetchUsers = () => {
  return axios.get(host);
};

let message = null;

const postUser = (data, id, setMessage) => {
  message = setMessage;
  if (id) {
    return axios.patch(host + '/' + id, data);
  }
  return axios.post(host + '/new', data);
};

const deleteUser = (id, setMessage = null) => {
  return axios.delete(host + '/' + id);
};

// Add a response interceptor
axios.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    console.log('interceptors', response);

    if (message)
      message({
        type: 'success',
        message: response.data.msg || 'Επιτυχιμένη ενέργεια'
      });

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('interceptors error', error);
    if (message) message({ type: 'error', message: 'Σφάλμα δοκιμάστε ξανά' });

    return Promise.reject(error);
  }
);

export { postUser, fetchUsers, deleteUser };
