import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postListSlice";
import userReducer from "../features/post/users/usersSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    users: userReducer,
  },
  devTools: true,
});
