import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await API.get(`/posts/${id}`);
        setPost(postRes.data);

        const commentRes = await API.get(`/comments/${id}`);
        setComments(commentRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/comments", {
        text,
        post: id,
        user: localStorage.getItem("userId")
      });

      const commentRes = await API.get(`/comments/${id}`);
      setComments(commentRes.data);

      setText("");
      setUserId("");

      alert("Comment added successfully");
    } catch (err) {
      console.error(err);
     // alert("Failed to add comment");
    }
  };

  if (!post) return <h2>Loading...</h2>;

  return (
    <>
      <h1>{post.title}</h1>

      <p>{post.content}</p>

      <h3>Author</h3>

      <p>{post.author?.name}</p>

      <hr />

      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.text}</p>
            <p>
              <strong>
                {comment.user?.name}
              </strong>
            </p>
            <hr />
          </div>
        ))
      )}

      <h2>Add Comment</h2>

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Comment"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />

        <br />
        <br />
        <button type="submit">
          Add Comment
        </button>
       
      </form>
    </>
  
);

  
}


export default PostDetails;