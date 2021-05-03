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
    errors: null,
    isLoading: false
  },

  mutations: {
    [mutationType.getArticleCommentsStart](state) {
      state.comments = null;
      state.errors = null;
      state.isLoading = true;
    },
    [mutationType.getArticleCommentsSuccess](state, payload) {
      state.comments = payload;
      state.isLoading = false;
    },
    [mutationType.getArticleCommentsFailure](state, payload) {
      state.errors = payload;
      state.isLoading = false;
    },

    [mutationType.postArticleCommentStart]() {},
    [mutationType.postArticleCommentSuccess]() {},
    [mutationType.postArticleCommentFailure]() {},

    [mutationType.deleteArticleCommentStart]() {},
    [mutationType.deleteArticleCommentSuccess]() {},
    [mutationType.deleteArticleCommentFailure]() {}
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
    },

    [actionType.postArticleComment](context, { slug, commentBody }) {
      return new Promise(resolve => {
        context.commit(mutationType.postArticleCommentStart);
        articleCommentsApi
          .postArticleComment(slug, commentBody)
          .then(comment => {
            context.commit(mutationType.postArticleCommentSuccess);
            resolve(comment);
          })
          .catch(() => {
            context.commit(mutationType.postArticleCommentFailure);
          });
      });
    },

    [actionType.deleteArticleComment](context, { slug, id }) {
      return new Promise(resolve => {
        context.commit(mutationType.deleteArticleCommentStart);
        articleCommentsApi
          .deleteArticleComment(slug, id)
          .then(() => {
            context.commit(mutationType.deleteArticleCommentSuccess);
            resolve();
          })
          .catch(() => {
            context.commit(mutationType.deleteArticleCommentFailure);
          });
      });
    }
  }
};
