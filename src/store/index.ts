import { configureStore } from "@reduxjs/toolkit";
import rewardsReducer from "./rewardsSlice";

// Configure the Redux store with all slices
export const store = configureStore({
  reducer: {
    rewards: rewardsReducer, // manage collected rewards state
  },
});

// Infer the RootState type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the AppDispatch type for useDispatch hook
export type AppDispatch = typeof store.dispatch;