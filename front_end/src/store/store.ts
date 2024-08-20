import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";

const store = configureStore({
  reducer: {
    list: listReducer,
  },
});

// Типы для состояния и диспетчера стора
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
