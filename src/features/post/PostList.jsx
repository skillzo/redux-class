import React from "react";
import { allPost } from "./postListSlice";
import { useSelector } from "react-redux";
import AddPost from "./AddPost";
import Timeago from "./Timeago";
import ReactionButtons from "./ReactionButtons";

export default function PostList() {
  const post = useSelector(allPost);
  const orderedPosts = post
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderedPost = orderedPosts.map((i) => {
    return (
      <article key={i.id}>
        <h3>{i?.title}</h3>
        <p>{i?.content?.substring(0, 100)}</p>
        <p className="postCredit">
          <span>by {i?.userId || "unknown"}</span>
          <Timeago timestamp={i?.date} />
        </p>
        <ReactionButtons post={i} />
      </article>
    );
  });

  return (
    <section>
      <AddPost />
      <h2>Posts</h2>
      {renderedPost}
    </section>
  );
}
