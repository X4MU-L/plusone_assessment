import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";
import tagsReducer from "./reducers/tags-reducer";
import postReducer from "./reducers/post-reducer";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "tags"], // Only persist these reducers
};

const reducer = combineReducers({
  auth: authReducer,
  tags: tagsReducer,
  posts: postReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Get the type of our store variable
export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(store);
