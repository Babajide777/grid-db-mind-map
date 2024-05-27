import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import { mapItemApiSlice } from "./Features/mapItem/mapItemApiSlice";

const userDataPersistConfig = {
  key: "mapItems",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [mapItemApiSlice.reducerPath]: mapItemApiSlice.reducer,
});
const persistedReducer = persistReducer(userDataPersistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mapItemApiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
export default store;
