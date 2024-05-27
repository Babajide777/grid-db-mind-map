import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

let store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

export default store;
