import { useState, useEffect } from "react";
import "./Comments.css";
import { fetchArticleComments } from "../utils/api";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleComments(article_id)
      .then((comments) => {
        if (comments) {
          setComments(comments);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError("Error loading comments");
        setIsLoading(false);
        console.log(err);
      });
  }, [article_id]);

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="comments-section">
      <h2>Comments ({comments.length})</h2>
      <div className="comments-list">
        {comments.map((comment) => (
          <article key={comment.comment_id} className="comment-card">
            <div className="comment-header">
              <span className="comment-author">{comment.author}</span>
              <span className="comment-date">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-body">{comment.body}</p>
            <div className="comment-footer">
              <span className="comment-votes">Votes: {comment.votes}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
