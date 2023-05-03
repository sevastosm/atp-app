import { axiosInstance, createMessage } from './helpers';
const host = 'http://localhost:6001/products';

const fetchProducts = async () => axiosInstance.get(host);

export const postProduct = async (data, setMessage, id = null) => {
  createMessage(setMessage);
  if (id) {
    return axiosInstance.patch(host + '/' + id, data);
  }
  return axiosInstance.post(host + '/new', data);
};

export const deleteProduct = async (id, setMessage = null) => {
  createMessage(setMessage);

  return axiosInstance.delete(host + '/' + id);
};

export { fetchProducts };
