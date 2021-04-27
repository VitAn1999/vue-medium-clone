import axios from '@/api/axios';

const getUserProfile = username => {
  return axios
    .get(`/profiles/${username}`)
    .then(response => response.data.profile);
};

export default {
  getUserProfile
};
