import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchMentorAsync } from '../mentor-details/mentorDetailsSlice';

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
    setTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
  },
  extraReducers: {
    [fetchMentorAsync.pending]: (state) => {
      state.status = status.loading;
    },
    [fetchMentorAsync.fulfilled]: (state, action) => {
      state.status = status.success;
      state.mentor = action.payload;
      state.status = status.idle;
    },
    [fetchMentorAsync.rejected]: (state) => {
      state.status = status.error;
      toast.error(state.status);
    },
  },
});

export const { setMentor, setTopic } = addReservationSlice.actions;

export default addReservationSlice.reducer;
