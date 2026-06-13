import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <h1>All Posts</h1>

      {posts.map((post) => (
        <div key={post._id}>
          <Link to={`/post/${post._id}`}>
  <h3>{post.title}</h3>
</Link>
          <p>{post.content}</p>
          <hr />
        </div>
      ))}
    </>
  );
}

export default Home;