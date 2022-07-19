import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchMentorTopics from './MentorTopicsAPI';

/**
   * Component status:
   * - INITIALIZED: Must change to one of the followings as soon as possible
   * - FETCHING   : Temporary status while fetchig data
   * - FETCHED    : Data is recieved
   * - FAILED     : Data fetching failed
   */
const initialState = {
  status: 'INITIALIZED',
  mentorTopics: [],
};

export const fetchMentorTopicsAsync = createAsyncThunk(
  'mentorTopics/fetchTopics',
  async ({ id, token }) => {
    const data = await fetchMentorTopics(id, token);
    return data;
  },
);

const mentorTopicsSlice = createSlice({
  name: 'mentorTopics',
  initialState,
  extraReducers: {
    [fetchMentorTopicsAsync.pending]: (state) => {
      state.status = 'FETCHING';
    },
    [fetchMentorTopicsAsync.fulfilled]: (state, action) => {
      state.status = 'FETCHED';
      state.mentorTopics = action.payload.data;
    },
    [fetchMentorTopicsAsync.rejected]: (state) => {
      state.status = 'FAILED';
    },
  },
});

export default mentorTopicsSlice;
