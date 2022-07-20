import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchMentorTopics, { addMentorTopic } from './MentorTopicsAPI';

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

export const addMentorTopicAsync = createAsyncThunk(
  'mentorTopics/addMentorTopic',
  async ({
    mentorId, topicId, rating, token,
  }) => {
    const data = addMentorTopic(mentorId, topicId, rating, token);
    return data;
  },
);

const mentorTopicsSlice = createSlice({
  name: 'mentorTopics',
  initialState,
  reducers: {
    cleanup: () => initialState,
  },
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
