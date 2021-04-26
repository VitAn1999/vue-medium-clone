import axios from '@/api/axios';

const addFavoriteArticle = slug => {
  return axios
    .post(`/articles/${slug}/favorite`)
    .then(response => response.data.article);
};

const removeFavoriteArticle = slug => {
  return axios
    .delete(`/articles/${slug}/favorite`)
    .then(response => response.data.article);
};

export default {
  addFavoriteArticle,
  removeFavoriteArticle
};
