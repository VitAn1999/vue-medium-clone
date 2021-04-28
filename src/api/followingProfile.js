import axios from '@/api/axios';

const followingProfile = username => {
  return axios
    .post(`/profiles/${username}/follow`)
    .then(response => response.data.profile);
};

const unfollowingProfile = username => {
  return axios
    .delete(`profiles/${username}/follow`)
    .then(response => response.data.profile);
};

export default {
  followingProfile,
  unfollowingProfile
};
