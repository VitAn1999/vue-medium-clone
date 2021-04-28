import followingProfileApi from '@/api/followingProfile';

export const mutationType = {
  followingProfileStart: '[followProfile] followingProfileStart',
  followingProfileSuccess: '[followProfile] followingProfileSuccess',
  followingProfileFailure: '[followProfile] followingProfileFailure'
};

export const actionType = {
  followingProfile: '[followProfile] followingProfile'
};

export default {
  mutations: {
    [mutationType.followingProfileStart]() {},
    [mutationType.followingProfileSuccess]() {},
    [mutationType.followingProfileFailure]() {}
  },

  actions: {
    [actionType.followingProfile](context, { username, isFollowing }) {
      return new Promise(resolve => {
        context.commit(mutationType.followingProfileStart);
        const promise = isFollowing
          ? followingProfileApi.unfollowingProfile(username)
          : followingProfileApi.followingProfile(username);
        promise
          .then(profile => {
            context.commit(mutationType.followingProfileSuccess);
            resolve(profile);
          })
          .catch(() => {
            context.commit(mutationType.followingProfileFailure);
          });
      });
    }
  }
};
