import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleArticle.css";
import Comments from "./Comments";
import { fetchSingleArticle, updateArticleVotes } from "../utils/api";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteErrorMessage, setVoteErrorMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id)
      .then((article) => {
        if (article) {
          setArticle(article);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError("Article not found");
        setIsLoading(false);
        console.log(err);
      });
  }, [article_id]);

  const handleVote = (increment) => {
    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + increment,
    }));

    updateArticleVotes(article_id, increment).catch((err) => {
      setArticle((currentArticle) => ({
        ...currentArticle,
        votes: currentArticle.votes - increment,
      }));
      setVoteErrorMessage("Failed to update vote. Please try again.");
    });
  };

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
      <div>
        <p>Votes: {article.votes}</p>
        <button onClick={() => handleVote(1)}>Upvote</button>
        <button onClick={() => handleVote(-1)}>Downvote</button>
        {voteErrorMessage && <p>{voteErrorMessage}</p>}
      </div>
      <Comments article_id={article_id} />
    </div>
  );
}
