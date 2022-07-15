import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import reservationsReducer from '../features/reservations/reservationsSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    reservations: reservationsReducer,
  },
});

export default store;
