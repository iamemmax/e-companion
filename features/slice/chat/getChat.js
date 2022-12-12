import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../components/config/Axios";

export const getChats = createAsyncThunk(
  "chats/fetch",
  async (id, thunkAPI) => {
   
    try {
      const response = await axios.get(`${baseUrl}/chat/${id}`);
      return response.data;
    } catch (error) {
      let message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const initialState = {
  chats: [],
  messages:[],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const chatSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    userChat: (state, action) => {
        state.isLoading = false;
      state.isSuccess = false;
      state.messages = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, userChat } = chatSlice.actions;
export default chatSlice.reducer;
