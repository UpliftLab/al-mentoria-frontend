import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mentorsSlice from '../features/mentors/mentorsSlice';
import mentorDetailsReducer from '../features/mentor-details/mentorDetailsSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    mentorDetails: mentorDetailsReducer,
    user: userSlice.reducer,
    mentors: mentorsSlice.reducer,
  },
});

export default store;
