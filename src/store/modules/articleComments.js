import articleCommentsApi from '@/api/articleComments';

export const mutationType = {
  getArticleCommentsStart: '[articleComments] getArticleCommentsStart',
  getArticleCommentsSuccess: '[articleComments] getArticleCommentsSuccess',
  getArticleCommentsFailure: '[articleComments] getArticleCommentsFailure',

  postArticleCommentStart: '[articleComments] postArticleCommentStart',
  postArticleCommentSuccess: '[articleComments] postArticleCommentSuccess',
  postArticleCommentFailure: '[articleComments] postArticleCommentFailure',

  deleteArticleCommentStart: '[articleComments] deleteArticleCommentStart',
  deleteArticleCommentSuccess: '[articleComments] deleteArticleCommentSuccess',
  deleteArticleCommentFailure: '[articleComments] deleteArticleCommentFailure'
};

export const actionType = {
  getArticleComments: '[articleComments] getArticleComments',
  postArticleComment: '[articleComments] postArticleComment',
  deleteArticleComment: '[articleComments] deleteArticleComment'
};

export default {
  state: {
    comments: null,
    errors: null
  },

  mutations: {
    [mutationType.getArticleCommentsStart](state) {
      state.comments = null;
      state.errors = null;
    },
    [mutationType.getArticleCommentsSuccess](state, payload) {
      state.comments = payload;
    },
    [mutationType.getArticleCommentsFailure](state, payload) {
      state.errors = payload;
    }
  },

  actions: {
    [actionType.getArticleComments](context, { slug }) {
      return new Promise(resolve => {
        context.commit(mutationType.getArticleCommentsStart);
        articleCommentsApi
          .getArticleComments(slug)
          .then(comments => {
            context.commit(mutationType.getArticleCommentsSuccess, comments);
            resolve(comments);
          })
          .catch(e => {
            context.commit(
              mutationType.getArticleCommentsFailure,
              e.response.data.errors
            );
          });
      });
    }
  }
};
