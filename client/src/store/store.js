import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import auth from "./Features/auth/authSlice";
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
import storage from "redux-persist/lib/storage";
import { authApiSlice } from "./Features/auth/authApiSlice";

const userDataPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [auth.name]: auth,
});
const persistedReducer = persistReducer(userDataPersistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
export default store;
