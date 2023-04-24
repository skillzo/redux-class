import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response?.data;
  } catch (e) {
    return e.message;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const allUsers = (state) => state.users;
export default userSlice.reducer;
