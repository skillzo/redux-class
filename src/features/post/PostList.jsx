import React, { useEffect } from "react";
import { allError, allPost, allStatus, fecthPost } from "./postListSlice";
import { useDispatch, useSelector } from "react-redux";
import AddPost from "./AddPost";
import Timeago from "./Timeago";
import ReactionButtons from "./ReactionButtons";
import { nanoid } from "@reduxjs/toolkit";
import { allUsers } from "./users/usersSlice";

export default function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(allPost);
  const status = useSelector(allStatus);
  const error = useSelector(allError);
  const post = useSelector(allPost);
  const users = useSelector(allUsers);

  console.log(users);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fecthPost());
    }
  }, [status, dispatch]);

  let renderedPost;
  if (status === "loading") {
    renderedPost = <p>Loading</p>;
  } else if (status === "succeeded") {
    const orderedPosts = post
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    renderedPost = orderedPosts?.slice(0, 10)?.map((i, idx) => {
      return (
        <article key={nanoid()}>
          <h3>{i?.title?.substring(0, 10)}</h3>
          <p>{i?.body?.substring(0, 100)}</p>
          <p className="postCredit">
            <span>by {i?.userId || "unknown"}</span>
            <Timeago timestamp={i?.date} />
          </p>
          <ReactionButtons post={i} />
        </article>
      );
    });
  } else if (status === "error") {
    renderedPost = <p>{error}</p>;
  }

  return (
    <section>
      <AddPost />
      <h2>Posts</h2>
      {renderedPost}
    </section>
  );
}
