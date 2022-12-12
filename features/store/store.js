import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../slice/users/LoginSlice";
import AuthReducer from "../slice/auth/MyUserSlices";
import postReducer from "../slice/post/postSlice";

import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import chatReducer from "../slice/chat/getChat";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  // persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const allReducer = combineReducers({
  auth: LoginReducer,
  posts: postReducer,
  users: AuthReducer,
  chat: chatReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth", "chat"],
};
const persistedReducer = persistReducer(persistConfig, allReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export default the store
export default store;
