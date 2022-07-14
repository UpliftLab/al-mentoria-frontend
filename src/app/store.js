import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mentorDetailsReducer from '../features/mentor-details/mentorDetailsSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    mentorDetails: mentorDetailsReducer,
  },
});

export default store;
