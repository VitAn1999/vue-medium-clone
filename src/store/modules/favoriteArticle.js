import favArticleApi from '@/api/favoriteArticle';

export const mutationType = {
  addFavoriteArticleStart: '[addFavArticle] addFavoriteArticleStart',
  addFavoriteArticleSuccess: '[addFavArticle] addFavoriteArticleSuccess',
  addFavoriteArticleFailure: '[addFavArticle] addFavoriteArticleFailure'
};

export const actionType = {
  addFavoriteArticle: '[addFavArticle] addFavoriteArtticle'
};

export default {
  mutations: {
    [mutationType.addFavoriteArticleStart]() {},
    [mutationType.addFavoriteArticleSuccess]() {},
    [mutationType.addFavoriteArticleFailure]() {}
  },

  actions: {
    [actionType.addFavoriteArticle](context, { slug, isFavorited }) {
      return new Promise(resolve => {
        context.commit(mutationType.addFavoriteArticleStart);
        const promise = isFavorited
          ? favArticleApi.removeFavoriteArticle(slug)
          : favArticleApi.addFavoriteArticle(slug);
        promise
          .then(article => {
            context.commit(mutationType.addFavoriteArticleSuccess, article);
            resolve(article);
          })
          .catch(() => {
            context.commit(mutationType.addFavoriteArticleFailure);
          });
      });
    }
  }
};
