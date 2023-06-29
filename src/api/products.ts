import { host } from 'src/config';
import { axiosInstance, createMessage } from './helpers';

const fetchProducts = async () => axiosInstance.get(host + '/products');

export const postProduct = async (data, setMessage, id = null) => {
  createMessage(setMessage);
  if (id) {
    return axiosInstance.patch(host + '/products/' + id, data);
  }
  return axiosInstance.post(host + '/products/new', data);
};

export const deleteProduct = async (id, setMessage = null) => {
  createMessage(setMessage);

  return axiosInstance.delete(host + '/products/' + id);
};

export { fetchProducts };
