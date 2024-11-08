import { useState, useEffect } from "react";
import "./ArticleList.css";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils/api";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles()
      .then((articles) => {
        if (articles) {
          setArticles(articles);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError("Error fetching articles");
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  if (isLoading) return <div>Loading articles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="articles-container">
      {articles.map((article) => (
        <Link to={`/articles/${article.article_id}`} key={article.article_id}>
          <article className="article-card">
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
        </Link>
      ))}
    </div>
  );
}
