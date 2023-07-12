import axios from 'axios';

export const getToken = () =>
  localStorage.getItem('token') ? localStorage.getItem('token') : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const axiosInstance = axios.create({
  headers: {
    Authorization: getAuthorizationHeader()
  }
});

export let message = null;

export const createMessage = (msg) => (message = msg);

// Add a response interceptor

axiosInstance.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log('interceptors', response);

    if (message)
      message({
        type: 'success',
        message: response.data?.msg || 'Επιτυχιμένη ενέργεια'
      });

    return response;
  },
  function (error) {
    // console.log('interceptors error', error);
    if (message) message({ type: 'error', message: 'Σφάλμα δοκιμάστε ξανά' });

    return Promise.reject(error);
  }
);

export { axiosInstance };
