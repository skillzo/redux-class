import React from "react";
import { useSelector } from "react-redux";
import { postById } from "./postListSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Timeago from "./Timeago";
import ReactionButtons from "./ReactionButtons";

export default function SinglePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => postById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <div onClick={() => navigate(-1)}>back</div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/edit/${post.id}`}>Edit Post</Link>
        <Timeago timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
}
