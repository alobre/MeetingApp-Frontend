import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Define your initial state here
  value: 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default configureStore({
  reducer: counterSlice.reducer,
});

