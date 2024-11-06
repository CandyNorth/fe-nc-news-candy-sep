import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ArticleList.css";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://be-nc-news-candy-sep.onrender.com/api/articles";
    axios
      .get(apiUrl)
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching articles");
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  if (isLoading) return <div>Loading articles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="articles-container">
      {articles.map((article) => (
        <article key={article.article_id} className="article-card">
          <img
            src={article.article_img_url}
            alt={article.title}
            className="article-image"
          />
          <div className="article-content">
            <h2>{article.title}</h2>
            <p className="article-meta">
              By {article.author} •{" "}
              {new Date(article.created_at).toLocaleDateString()}
            </p>
            <p className="article-topic">Topic: {article.topic}</p>
            <div className="article-stats">
              <span> {article.comment_count} comments</span>
              <span> {article.votes} votes</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
