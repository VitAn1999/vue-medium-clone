import axios from '@/api/axios';

const getArticleComments = slug => {
  return axios
    .get(`/articles/${slug}/comments`)
    .then(response => response.data.comments);
};

const postArticleComment = (slug, comment) => {
  return axios
    .post(`/articles/${slug}/comments`, { comment })
    .then(response => response.data.comment);
};

const deleteArticleComment = (slug, id) => {
  return axios
    .delete(`/articles/${slug}/comments/${id}`)
    .then(response => response.data.comments);
};

export default {
  getArticleComments,
  postArticleComment,
  deleteArticleComment
};
