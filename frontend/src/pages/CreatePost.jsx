import { useState } from "react";
import API from "../services/api";

function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/posts", form);
      alert("Post created successfully");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <br /><br />

        <textarea
          placeholder="Content"
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Author ID"
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
        />

        <br /><br />

        <button type="submit">
          Create Post
        </button>
      </form>
    </>
  );
}

export default CreatePost;