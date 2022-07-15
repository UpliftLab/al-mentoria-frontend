import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mentorsSlice from '../features/mentors/mentorsSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
    mentors: mentorsSlice.reducer,
  },
});

export default store;
