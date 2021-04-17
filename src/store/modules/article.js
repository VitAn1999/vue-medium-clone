import articleApi from '@/api/article';

export const mutationType = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure'
};

export const actionType = {
  getArticle: '[article] getArticle'
};

export default {
  state: {
    isLoading: false,
    data: null,
    error: null
  },
  mutations: {
    [mutationType.getArticleStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationType.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationType.getArticleFailure](state) {
      state.isLoading = false;
    }
  },
  actions: {
    [actionType.getArticle](context, { slug }) {
      return new Promise(resolve => {
        context.commit(mutationType.getArticleStart);
        articleApi
          .getArticle(slug)
          .then(article => {
            context.commit(mutationType.getArticleSuccess, article);
            resolve(article);
          })
          .catch(() => {
            context.commit(mutationType.getArticleFailure);
          });
      });
    }
  }
};
