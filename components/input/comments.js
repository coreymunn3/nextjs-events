import { useState, useEffect, useContext } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import styles from './comments.module.css';
import axios from 'axios';
import NotificationContext from '../../store/notificationContext';

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      setLoading(true);
      axios.get(`/api/comments/${eventId}`).then(({ data }) => {
        setLoading(false);
        setComments(data.comments);
        console.log(data);
      });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Comment',
      message: 'Posting Comment...',
      status: 'pending',
    });
    // send data to API
    axios
      .post(`/api/comments/${eventId}`, commentData)
      .then(({ data }) => {
        console.log(data);
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Your Comment has been Posted',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Unable to Post Comment',
          status: 'error',
        });
      });
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} loading={loading} />}
    </section>
  );
}

export default Comments;
