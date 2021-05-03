import axios from '@/api/axios';

const getArticleComments = slug => {
  return axios
    .get(`/articles/${slug}/comments`)
    .then(response => response.data.comments);
};

const postArticleComment = (slug, commentBody) => {
  return axios
    .post(`/articles/${slug}/comments`, { comment: { body: commentBody } })
    .then(response => response.data.comment);
};

const deleteArticleComment = (slug, id) => {
  return axios.delete(`/articles/${slug}/comments/${id}`);
};

export default {
  getArticleComments,
  postArticleComment,
  deleteArticleComment
};
