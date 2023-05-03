import axios from 'axios';

const appToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
  headers: {
    Authorization: 'Bearer ' + appToken()
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
