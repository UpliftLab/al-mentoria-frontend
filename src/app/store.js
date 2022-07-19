import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import reservationsSlice from '../features/reservations/reservationsSlice';
import mentorsSlice from '../features/mentors/mentorsSlice';
import mentorDetailsReducer from '../features/mentor-details/mentorDetailsSlice';
import addReservationReducer from '../features/add-reservation/addReservationSlice';
import addMentorReducer from '../features/add-mentor/addMentorSlice';
import topicSlice from '../features/topics/topicSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    reservations: reservationsSlice.reducer,
    mentorDetails: mentorDetailsReducer,
    user: userSlice.reducer,
    addReservation: addReservationReducer,
    addMentor: addMentorReducer,
    topic: topicSlice.reducer,
    mentors: mentorsSlice.reducer,
  },
});

export default store;
