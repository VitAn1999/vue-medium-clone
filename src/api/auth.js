import axios from '@/api/axios';

const register = payload => {
  return axios.post('/users', { user: payload });
};

const login = payload => {
  return axios.post('/users/login', { user: payload });
};

export default {
  register,
  login
};
