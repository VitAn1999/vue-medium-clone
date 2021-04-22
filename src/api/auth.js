import axios from '@/api/axios';

const register = payload => {
  return axios.post('/users', { user: payload });
};

const login = payload => {
  return axios.post('/users/login', { user: payload });
};

const getCurrentUser = () => {
  return axios.get('/user');
};

const updateCurrentUser = updatedUser => {
  return axios
    .put(`/user`, { user: updatedUser })
    .then(response => response.data.user);
};

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser
};
