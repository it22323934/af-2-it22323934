import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../redux/themeSlice.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // Add other reducers here as your app grows
  },
});