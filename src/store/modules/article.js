import articleApi from '@/api/article';

export const mutationType = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure'
};

export const actionType = {
  getArticle: '[article] getArticle',

  deleteArticle: '[article] deleteArticle'
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
      state.error = null;
    },
    [mutationType.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationType.getArticleFailure](state, payload) {
      state.isLoading = false;
      state.error = payload;
    },

    [mutationType.deleteArticleStart]() {},
    [mutationType.deleteArticleSuccess]() {},
    [mutationType.deleteArticleFailure]() {}
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
          .catch(e => {
            context.commit(mutationType.getArticleFailure, e);
          });
      });
    },

    [actionType.deleteArticle](context, { slug }) {
      return new Promise(resolve => {
        context.commit(mutationType.deleteArticleStart);
        articleApi
          .deleteArticle(slug)
          .then(() => {
            context.commit(mutationType.deleteArticleSuccess);
            resolve();
          })
          .catch(() => {
            context.commit(mutationType.deleteArticleFailure);
          });
      });
    }
  }
};
