import axios from '@/api/axios';

const register = payload => {
  return axios.post('/users', { user: payload });
};

export default {
  register
};
