import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchMentor from './mentorDetailsAPI';

const initialState = {
  mentorDetails: [],
  mentor: null,
  status: 'idle',
};

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
