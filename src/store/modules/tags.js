import feedApi from '@/api/feed';

export const mutationType = {
  getTagsStart: '[tags] getTagsStart',
  getTagsSuccess: '[tags] getTagsSuccess',
  getTagsFailure: '[tags] getTagsFailure'
};

export const actionType = {
  getTags: '[tags] getTags'
};

export default {
  state: {
    isLoading: false,
    data: null,
    error: null
  },
  mutations: {
    [mutationType.getTagsStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationType.getTagsSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationType.getTagsFailure](state) {
      state.isLoading = false;
    }
  },
  actions: {
    [actionType.getTags](context, payload) {
      return new Promise(resolve => {
        context.commit(mutationType.getTagsStart);
        feedApi
          .getTags(payload.tagsUrl)
          .then(response => {
            context.commit(mutationType.getTagsSuccess, response.data);
            resolve(response.data);
          })
          .catch(() => {
            context.commit(mutationType.getTagsFailure);
          });
      });
    }
  }
};
