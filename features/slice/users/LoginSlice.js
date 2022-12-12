import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../components/config/Axios";
import { login } from "../../actions/user/AuthService";

export const RegisterUser = createAsyncThunk(
  "auth/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://companion-api.vercel.app/api/users/register",
        data
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
export const VerifyUser = createAsyncThunk(
  "auth/verify",
  async (sendToken, thunkAPI) => {
    try {
      let { id, token } = sendToken;
      const response = await axios.put(
        `https://companion-api.vercel.app/api/users/verify/${id}`,
        {
          token: token,
        }
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
export const LoginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    console.log(user);
    try {
      // const response = await axios.post("https://essential-dating-api.herokuapp.com/api/users/login", user).catch(err => console.log(err.message))
      return await login(user);
    } catch (error) {
      let message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "users/myprofile",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.data.userToken;
    try {
      const config = {
        headers: {
          Authorization: `Berear ${token}`,
        },
      };
      const response = await axios.get(
        `https://e-companion.onrender.com/api/users/me`,

        config
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
export const updateProfiles = createAsyncThunk(
  "users/myprofile",
  async (data, thunkAPI) => {
    let { input, id } = data;
    try {
      const { data } = await axios.put(
        `${baseUrl}/users/update-profile/${id}`,
        input
      );
      return data.data;
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
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  followerProfile: {},
  message: "",
};

export const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.followerProfile = {};
    },
    followUser: (state, action) => {
      state.user.data.user.followers.push(action.payload);
      state.user.data.user.following.push(action.payload);
      state.message = "following";
    },
    unfollowUser: (state, action) => {
      const data = state.user.data.user.followers.filter(
        (x) => x?._id !== action.payload._id
      );
      console.log(data?._id);
      if (data) {
        state.user.data.user.followers = data;
      }
      const isMatch = state.user.data.user.following.filter(
        (x) => x?._id !== action.payload._id
      );
      if (isMatch) {
        state.user.data.user.following = isMatch;
      }
    },
// follow friends follower
    followFriendFollower: (state, action) => {
      state.user.data.user.followers.map(x => {
        if (x?._id === action?.payload) {
          x.followers.push(action.payload)
        }
      });
      state.user.data.user.following.map(x => {
        if (x?._id === action?.payload) {
          x.following.push(action.payload)
        }
      })
    },

// follow friends follower
    unfollowFriendFollower: (state, action) => {
      state.user.data.user.followers.map(x => {
        if (x?._id === action?.payload) {
          x?.follower?.filter(follower => follower !== action.payload)
        }
      });
      state.user.data.user.following.map(x => {
         if (x?._id === action?.payload) {
          x?.following?.filter(following => following !== action.payload)
        }
      })
    },

    uploadProfilePix: (state, action) => {
      state.user.data.user.avater = action.payload;
    },
    updateProfile: (state, action) => {
      state.user.data.user = action.payload;
    },

    logout: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.user = null;
    },

    myfollowerProfile: (state, action) => {
      state.isLoading = false;
      state.followerProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      //  VERIFY
      // verify user slice
      .addCase(VerifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(VerifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // verify user slice
      .addCase(updateProfiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.data.user = action.payload;
        state.message = "profile updated successfully";
      })
      .addCase(updateProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      //  VERIFY
      // verify user slice

      // login user
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      });
  },
});

// login user

export const {
  reset,
  logout,
  followUser,
  uploadProfilePix,
  updateProfile,
  unfollowUser,
  myfollowerProfile,
  followFriendFollower,
  unfollowFriendFollower
} = LoginSlice.actions;
export default LoginSlice.reducer;
