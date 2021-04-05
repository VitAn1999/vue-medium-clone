import feedApi from '@/api/feed';

export const mutationType = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[feed] getFeedFailure'
};

export const actionType = {
  getFeed: '[feed] getFeed'
};

export default {
  state: {
    isLoading: false,
    data: null,
    error: null
  },
  mutations: {
    [mutationType.getFeedStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationType.getFeedSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationType.getFeedFailure](state) {
      state.isLoading = false;
    }
  },
  actions: {
    [actionType.getFeed](context, payload) {
      return new Promise(resolve => {
        context.commit(mutationType.getFeedStart);
        feedApi
          .getFeed(payload.apiUrl)
          .then(response => {
            context.commit(mutationType.getFeedSuccess, response.data);
            resolve(response.data);
          })
          .catch(() => {
            context.commit(mutationType.getFeedFailure);
          });
      });
    }
  }
};
