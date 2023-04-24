import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

// const initialState = [
//   {
//     id: nanoid(),
//     title: "Dont get fat",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla distinctio illo, corrupti ut obcaecati unde fugit perspiciatis voluptatum voluptatibus asperiores modi earum. Quisquam, blanditiis praesentium dolores consequuntur sapiente quod ",
//     userId: "skillzo",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: nanoid(),
//     title: "another title here",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla distinctio illo, corrupti ut obcaecati unde fugit perspiciatis  ",

//     userId: "pappi",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
// ];

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
// base url
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fecthPost = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response?.data];
  } catch (e) {
    return e.message;
  }
});

// slice
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
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[emojiName]++;
      }
    },
    deletePost: (state, { payload }) => {
      state.posts.filter((i) => {
        return i.id !== payload;
      });
    },
  },
  extraReducers: {
    [fecthPost.pending]: (state) => {
      state.status = "loading";
    },
    [fecthPost.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";

      // do this to add more key value to the result gotten from the api
      let min = 1;
      const loadedPost = payload.map((i) => {
        i.date = sub(new Date(), { minutes: min++ }).toISOString();
        i.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return i;
      });

      // for every loaded object of post add this above schema to the object
      state.posts = state.posts.concat(loadedPost);
    },
    [fecthPost.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload.error.message;
    },
  },
});

export const allPost = (state) => state.post.posts;
export const allStatus = (state) => state.post.status;
export const allError = (state) => state.post.error;
export const { addPost, deletePost, addReaction } = postSlice.actions;
export default postSlice.reducer;

// extra reducer using builder
// extraReducers(builder) {
//   builder
//     .addCase(fecthPost.pending, (state, { payload }) => {
//       state.status = "laoding";
//     })
//     .addCase(fecthPost.fulfilled, (state, { payload }) => {
//       state.status = "succeeded";

//       // do this to add more key value to the result gotten from the api
//       let min = 1;
//       const loadedPost = payload.map((i) => {
//         i.date = sub(new Date(), { minutes: min++ }).toISOString();
//         i.reactions = {
//           thumbsUp: 0,
//           wow: 0,
//           heart: 0,
//           rocket: 0,
//           coffee: 0,
//         };
//         return i;
//       });

//       // for every loaded object of post add this above schema to the object
//       state.posts = state.posts.concat(loadedPost);
//     })
//     .addCase(fecthPost.rejected, (state, { payload }) => {
//       state.status = "failed";
//       state.error = payload.error.message;
//     });
// },
