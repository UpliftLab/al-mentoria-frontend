import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchMentorDetails from './mentorDetailsAPI';

const initialState = {
  mentorDetails: [],
  status: 'idle',
};

export const fetchMentorDetailsAsync = createAsyncThunk(
  'mentorDetails/fetchMentorDetails',
  async (mentorID) => {
    const response = await fetchMentorDetails(mentorID);
    return response.data;
  },
);

export const mentorDetailsSlice = createSlice({
  name: 'mentorDetails',
  initialState,
  extraReducers: {
    [fetchMentorDetailsAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchMentorDetailsAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.mentorDetails = action.payload;
    },
    [fetchMentorDetailsAsync.rejected]: (state) => {
      state.status = 'error';
    },
  },
});

export const { setMentorDetails } = mentorDetailsSlice.actions;

export default mentorDetailsSlice.reducer;
