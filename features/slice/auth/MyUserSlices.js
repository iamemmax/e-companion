import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../components/config/Axios";


export const myFollowers = createAsyncThunk(
  "users/follower",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/users/followers`);

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

export const forgetPasswordReducer = createAsyncThunk(
  "users/forget-password",
  async (email, thunkAPI) => {
    console.log(email);
    try {
      const response = await axios.get(
        `${baseUrl}/users/forget-password`,
        email
      );

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
  // user: null,
  followers: [],
  userInfo: [],
  userBio: [],
  userPass: [],
  userAddress: [],
  searchPeople: {},
  forgetPass: {},
  followerProfile: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const myUsersSlices = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveInput: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    },

    searchUsers: (state, action) => {
      state.isLoading = false;
      state.searchPeople = action.payload;
    },
    savedUserBio: (state, action) => {
      state.userBio = action.payload;
    },
    savedUserPass: (state, action) => {
      state.isLoading = false;
      state.userPass = action.payload;
    },
    savedUserAddress: (state, action) => {
      state.isLoading = false;
      state.userAddress = action.payload;
    },

    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(myFollowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.followers = action.payload;
      })
      .addCase(myFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // forget password
      .addCase(forgetPasswordReducer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPasswordReducer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.forgetPass = action.payload;
      })
      .addCase(forgetPasswordReducer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  reset,
  saveInput,
  savedUserBio,
  savedUserPass,
  savedUserAddress,
  searchUsers,
} = myUsersSlices.actions;
export default myUsersSlices.reducer;
