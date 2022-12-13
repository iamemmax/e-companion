import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../components/config/Axios";

// export const CreateNewPost = createAsyncThunk(
//   "post/new",
//   async (data, thunkAPI) => {
//     const { description, visibility, video, img , myId} = data;
//     try {
      
//         let newData = new FormData();
//         newData.append("visibility", visibility);
//         newData.append("description", description);
//         newData.append("author", myId);
//         newData.append("userId", myId);
//         for (let i = 0; i < img.length; i++) {
//           newData.append("img", img[i]);
//         }
        
//         let videoData = new FormData();
//         videoData.append("visibility", visibility);
//         videoData.append("description", description);
//         videoData.append("author", myId);
//         videoData.append("userId", myId);
      
   
//           videoData.append("video", video);
        
//       if (img) {
        
//         const { data } = await axios.post(`${baseUrl}/posts/new`, newData);
//         return data;
//       } 
//       if(video){
//         const { data } = await axios.post(`${baseUrl}/posts/video/new`, videoData);
//         console.log(data)
//         return data;
//       }
//       console.log(video)

//     } catch (error) {
//       let message =
//         (error.response && error.response.data && error.response.data.msg) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
export const CreateMyActivityPost = createAsyncThunk(
  "post/new-post",
  async (data, thunkAPI) => {
    const { description, visibility, img } = data;
    try {
      let newData = new FormData();
      newData.append("visibility", visibility);
      newData.append("description", description);
      for (let i = 0; i < img.length; i++) {
        newData.append("img", img[i]);
      }
      const { data } = await axios.post(`${baseUrl}/posts/new`, newData);
      return data;
    } catch (error) {
      let message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchPosts = createAsyncThunk(
  "post/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${baseUrl}/posts`);
      // .catch((err) => console.log(err.message));
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
export const singlePost = createAsyncThunk(
  "post/fetch-single-post",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`${baseUrl}/posts/${id}`);
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
// export const DeletePostImg = createAsyncThunk(
//   "post/delete-post-img",
//   async (datas, thunkAPI) => {
//     try {
//       let { id, img_id, token } = datas;
//       let data = JSON.stringify({
//         img_id,
//       });

//       var config = {
//         method: "delete",
//         url:
//           "https://essential-dating-api.herokuapp.com/api/posts/remove-img/" +
//           id,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         data,
//       };
//       axios(config).then(function (response) {
//         // return response.data.data;
//         console.log(response.data);
//       });
//     } catch (error) {
//       let message =
//         (error.response && error.response.data && error.response.data.msg) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const updatePost = createAsyncThunk(
  "post/update",
  async (data, thunkAPI) => {
    let { input, id } = data;
    try {
      const { data } = await axios.put(`${baseUrl}/posts/${id}`, input);
      console.log(data);
      return data;
    } catch (error) {
      let message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchAllUserPosts = createAsyncThunk(
  "post/all-user-fetch",
  async (id, thunkAPI) => {
   
    try {
     
      const {data} = await axios.get(`${baseUrl}/posts/mypost/${id}`);
      return data;
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
  posts: [],
  newPost: {},
  post: {},
  search:null,
  singlePost: {},
  updatePostImages: [],
  latestPost : {},
  myposts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    CreateNewPost: (state, action) => {
      state.posts.push(action.payload)
    },
    getPostFromSocket: (state, action) => {
      state.posts = [ action.payload, ...state.posts]
    },
  searchInput: (state, action) => {
      state.search = action.payload
    },
    searchLatestPost: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.latestPost = action.payload
      state.isError = false;
      state.message = "";
    },
    
    likePosts: (state, action) => {
      const {id, data} = action.payload
      const check = state.posts.map(post => {
        if (post._id === id) {
         
         post.likes = data
        }
      })
  

    },
    deletePost: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.isError = false;
      state.message = "";
    },
    addComment: (state, action) => {
       const {id, data} = action.payload
      const check = state.posts.map(post => {
        if (post._id === id) {
         
         post.comments = data
        }
      })
      // state.post = action.payload
    },

 deleteComments: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post.comments = state.post.comments.filter((post) => post._id !== action.payload);
      state.isError = false;
      state.message = "";
    },
    
    addReply: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      
      state.post = action.payload
    },
    deleteReplys: (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.post.replies = state.post.replies.filter((post) => post._id !== action.payload);
         state.isError = false;
         state.message = "";
       },
    
    showComment: (state, action) => {
      state.post.comments = action.payload
    },
    showReply: (state, action) => {
    state.post.replies = action.payload
    },
    // state.post.replies = action.payload
    deleteUserActivityPost: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.myposts.results = state.myposts.results.filter(
        (post) => post._id !== action.payload
      );
      state.isError = false;
      state.message = "";
    },
    deletePostImg: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post.img = state.post.img.filter(
        (res) => res.img_id !== action.payload.img_id
      );

      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

  
      // fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.posts = {};
        state.message = action.payload;
      })

      // fetch single post
      .addCase(singlePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singlePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(singlePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // update post
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload.data;
        state.message = "post updated successfully";
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchAllUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myposts = action.payload;
        // state.message = "post updated successfully";
      })
      .addCase(fetchAllUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // create new post in activity dashboard

      .addCase(CreateMyActivityPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateMyActivityPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.myposts.results.push(action.payload.data);
        // state.message = "post updated successfully";
      })
      .addCase(CreateMyActivityPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// login user

export const { reset, deletePost, CreateNewPost, getPostFromSocket, deletePostImg, deleteUserActivityPost , addComment, deleteComments, addReply, showComment,deleteReplys, showReply, likePosts,  searchLatestPost, searchInput} =
  postSlice.actions;
export default postSlice.reducer;
