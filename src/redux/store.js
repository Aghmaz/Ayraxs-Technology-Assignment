import { configureStore } from "@reduxjs/toolkit";
import dataHandeler from "./DataSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, dataHandeler);

export const store = configureStore({
  reducer: {
    dataHandeler: persistedReducer,
  },
});

export const persistor = persistStore(store);
