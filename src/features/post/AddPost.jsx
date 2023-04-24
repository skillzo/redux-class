import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postListSlice";
import { allUsers } from "./users/usersSlice";

export default function AddPost() {
  const dispatch = useDispatch();
  const users = useSelector(allUsers);

  const [post, setpost] = useState({
    title: "",
    content: "",
    userId: "",
  });

  const handleChange = (e) => {
    setpost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const renderedUser = users?.map((i) => {
    return (
      <option key={i.id} value={i.name}>
        {i.name}
      </option>
    );
  });
  console.log(users);

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="userId"
          value={post.userId}
          onChange={handleChange}
        >
          <option value=""></option>
          {renderedUser}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="content"
          value={post.content}
          onChange={handleChange}
        />
        <button
          type="button"
          disabled={!post.title || !post.content || !post.userId}
          onClick={(e) => {
            e.preventDefault();
            dispatch(addPost(post.title, post.content, post.userId));
          }}
        >
          Save Post
        </button>
      </form>
    </section>
  );
}
