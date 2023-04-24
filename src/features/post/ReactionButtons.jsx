import { useDispatch } from "react-redux";
import { addReaction } from "./postListSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const em = Object.entries(reactionEmoji).map(([name, emoji], _, i) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(addReaction({ postId: post.id, emojiName: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{em}</div>;
};
export default ReactionButtons;
