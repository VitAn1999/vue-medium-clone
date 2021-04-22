import articleApi from '@/api/article';

export const mutationType = {
  editArticleStart: '[editArticle] editArticleStart',
  editArticleSuccess: '[editArticle] editArticleSuccess',
  editArticleFailure: '[editArticle] editArticleFailure',

  getArticleStart: '[editArticle] getArticleStart',
  getArticleSuccess: '[editArticle] getArticleSuccess',
  getArticleFailure: '[editArticle] getArticleFailure'
};

export const actionType = {
  editArticle: '[editArticle] editArticle',
  getArticle: '[editArticle] getArticle'
};

export default {
  state: {
    isSubmiting: false,
    isLoading: false,
    article: null,
    validationErrors: null
  },

  mutations: {
    [mutationType.editArticleStart](state) {
      state.isSubmiting = true;
      state.validationErrors = null;
    },

    [mutationType.editArticleSuccess](state) {
      state.isSubmiting = false;
    },

    [mutationType.editArticleFailure](state, payload) {
      state.isSubmiting = false;
      state.validationErrors = payload;
    },

    [mutationType.getArticleStart](state) {
      state.isLoading = true;
    },

    [mutationType.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.article = payload;
    },

    [mutationType.getArticleFailure](state) {
      state.isLoading = false;
    }
  },

  actions: {
    [actionType.editArticle](context, { slug, articleInput }) {
      return new Promise(resolve => {
        context.commit(mutationType.editArticleStart);
        articleApi
          .updateArticle(slug, articleInput)
          .then(article => {
            context.commit(mutationType.editArticleSuccess);
            resolve(article);
          })
          .catch(result => {
            context.commit(
              mutationType.editArticleFailure,
              result.response.data.errors
            );
          });
      });
    },

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
