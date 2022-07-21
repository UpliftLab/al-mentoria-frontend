import { configureStore } from '@reduxjs/toolkit';
import reservationsSlice from '../features/reservations/reservationsSlice';
import mentorsSlice from '../features/mentors/mentorsSlice';
import mentorDetailsReducer from '../features/mentor-details/mentorDetailsSlice';
import addReservationReducer from '../features/add-reservation/addReservationSlice';
import addMentorReducer from '../features/add-mentor/addMentorSlice';
import topicSlice from '../features/topics/topicSlice';
import userSlice from '../features/user/userSlice';
import mentorTopicsSlice from '../features/mentorTopics/mentorTopicsSlice';

const store = configureStore({
  reducer: {
    reservations: reservationsSlice.reducer,
    mentorDetails: mentorDetailsReducer,
    user: userSlice.reducer,
    addReservation: addReservationReducer,
    addMentor: addMentorReducer,
    topic: topicSlice.reducer,
    mentors: mentorsSlice.reducer,
    mentorTopics: mentorTopicsSlice.reducer,
  },
});

export default store;
