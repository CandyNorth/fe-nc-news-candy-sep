import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-candy-sep.onrender.com/api",
  timeout: 1000,
});

export const fetchArticles = () =>
  api
    .get("/articles")
    .then((response) => {
      if (response.status !== 200)
        return Promise.reject(`expected 200, got ${response.status}`);
      return response.data.articles;
    })
    .catch((err) => console.log(err));

export const fetchSingleArticle = (article_id) =>
  api
    .get(`/articles/${article_id}`)
    .then((response) => {
      if (response.status !== 200)
        return Promise.reject(`expected 200, got ${response.status}`);
      return response.data.article;
    })
    .catch((err) => console.log(err));

export const fetchArticleComments = (article_id) =>
  api
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      if (response.status !== 200)
        return Promise.reject(`expected 200, got ${response.status}`);
      return response.data.comments;
    })
    .catch((err) => console.log(err));

export const fetchTopics = () =>
  api
    .get("/topics")
    .then((response) => {
      if (response.status !== 200)
        return Promise.reject(`expected 200, got ${response.status}`);
      return response.data.topics;
    })
    .catch((err) => console.log(err));

export const fetchArticlesByTopic = (topic) =>
  api
    .get("/articles", { params: { topic } })
    .then((response) => {
      if (response.status !== 200)
        return Promise.reject(`expected 200, got ${response.status}`);
      return response.data.articles;
    })
    .catch((err) => console.log(err));
