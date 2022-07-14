import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMentorDetails, fetchMentor } from './mentorDetailsAPI';

const initialState = {
  mentorDetails: [],
  mentor: null,
  status: 'idle',
};

export const fetchMentorDetailsAsync = createAsyncThunk(
  'mentorDetails/fetchMentorDetails',
  async (mentorID) => {
    const response = await fetchMentorDetails(mentorID);
    return response.data;
  },
);

export const fetchMentorAsync = createAsyncThunk(
  'mentorDetails/fetchMentor',
  async (mentorID) => {
    const response = await fetchMentor(mentorID);
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
    [fetchMentorAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchMentorAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.mentor = action.payload;
    },
    [fetchMentorAsync.rejected]: (state) => {
      state.status = 'error';
    },
  },
});

export default mentorDetailsSlice.reducer;
