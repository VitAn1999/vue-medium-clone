import userProfileApi from '@/api/userProfile';

export const mutationType = {
  getUserProfileStart: '[userProfile] getUserProfileStart',
  getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
  getUserProfileFailure: '[userProfile] getUserProfileFailure'
};

export const actionType = {
  getUserProfile: '[userProfile] getUserProfile'
};

export default {
  state: {
    isLoading: false,
    error: null,
    data: null
  },

  mutations: {
    [mutationType.getUserProfileStart](state) {
      state.data = null;
      state.isLoading = true;
    },
    [mutationType.getUserProfileSuccess](state, payload) {
      state.data = payload;
      state.isLoading = false;
    },
    [mutationType.getUserProfileFailure](state) {
      state.isLoading = false;
    }
  },

  actions: {
    [actionType.getUserProfile](context, { username }) {
      return new Promise(resolve => {
        context.commit(mutationType.getUserProfileStart);
        userProfileApi
          .getUserProfile(username)
          .then(userProfile => {
            context.commit(mutationType.getUserProfileSuccess, userProfile);
            resolve(userProfile);
          })
          .catch(() => {
            context.commit(mutationType.getUserProfileFailure);
          });
      });
    }
  }
};
