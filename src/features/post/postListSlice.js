import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: nanoid(),
    title: "Dont get fat",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla distinctio illo, corrupti ut obcaecati unde fugit perspiciatis voluptatum voluptatibus asperiores modi earum. Quisquam, blanditiis praesentium dolores consequuntur sapiente quod ",
    userId: "skillzo",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: nanoid(),
    title: "another title here",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla distinctio illo, corrupti ut obcaecati unde fugit perspiciatis  ",

    userId: "pappi",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: {
      reducer(state, { payload }) {
        return [...state, payload];
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    addReaction(state, { payload }) {
      const { postId, emojiName } = payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[emojiName]++;
      }
    },
    deletePost: (state, { payload }) => {
      state.filter((i) => {
        return i.id !== payload;
      });
    },
  },
});

export const allPost = (state) => state.post;
export const { addPost, deletePost, addReaction } = postSlice.actions;
export default postSlice.reducer;
