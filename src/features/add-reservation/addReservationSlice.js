import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookReservation from './bookReservationAPI';

export const bookReservationAsync = createAsyncThunk(
  'bookReservation',
  async ({ mentorTopicID, reservationDate, token }) => {
    const result = await bookReservation({
      mentorTopicID,
      date: reservationDate,
      token,
    });
    return result;
  },
);

export const status = {
  idle: 'IDLE',
  success: 'SUCCESS',
  error: 'ERROR',
  loading: 'LOADING',
};

const initialState = {
  mentor: null,
  status: status.idle,
  selectedTopic: null,
};

export const addReservationSlice = createSlice({
  name: 'addReservation',
  initialState,
  reducers: {
    setMentor: (state, action) => {
      state.mentor = action.payload;
    },
  },
  extraReducers: {
    [bookReservationAsync.pending]: (state) => {
      state.status = status.loading;
    },
    [bookReservationAsync.fulfilled]: (state) => {
      state.status = status.success;
    },
    [bookReservationAsync.rejected]: (state) => {
      state.status = status.error;
    },
  },
});

export const { setMentor } = addReservationSlice.actions;

export default addReservationSlice.reducer;
