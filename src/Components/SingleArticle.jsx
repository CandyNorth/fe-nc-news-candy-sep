import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleArticle.css";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://be-nc-news-candy-sep.onrender.com/api/articles/${article_id}`,
      )
      .then(({ data }) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Article not found");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return null;

  return (
    <div className="single-article">
      <h1>{article.title}</h1>
      <div className="article-meta">
        <p>By {article.author}</p>
        <p>Posted on {new Date(article.created_at).toLocaleDateString()}</p>
        <p>Topic: {article.topic}</p>
      </div>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-full-image"
      />
      <p className="article-body">{article.body}</p>
      <div className="article-stats">
        <span> {article.votes} votes</span>
        <span> {article.comment_count} comments</span>
      </div>
    </div>
  );
}
