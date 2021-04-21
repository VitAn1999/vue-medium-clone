import articleApi from '@/api/article';

export const mutationType = {
  createArticleStart: '[createArticle] createArticleStart',
  createArticleSuccess: '[createArticle] createArticleSuccess',
  createArticleFailure: '[createArticle] createArticleFailure'
};

export const actionType = {
  createArticle: '[createArticle] createArticle'
};

export default {
  state: {
    isSubmiting: false,
    validationErrors: null
  },

  mutations: {
    [mutationType.createArticleStart](state) {
      state.isSubmiting = true;
      state.validationErrors = null;
    },
    [mutationType.createArticleSuccess](state) {
      state.isSubmiting = false;
    },
    [mutationType.createArticleFailure](state, payload) {
      state.isSubmiting = false;
      state.validationErrors = payload;
    }
  },

  actions: {
    [actionType.createArticle](context, { articleInput }) {
      return new Promise(resolve => {
        context.commit(mutationType.createArticleStart);
        articleApi
          .createArticle(articleInput)
          .then(article => {
            context.commit(mutationType.createArticleSuccess, article);
            resolve(article);
          })
          .catch(result => {
            context.commit(
              mutationType.createArticleFailure,
              result.response.data.errors
            );
          });
      });
    }
  }
};
