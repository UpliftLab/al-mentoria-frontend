import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
  },
});

export default store;
