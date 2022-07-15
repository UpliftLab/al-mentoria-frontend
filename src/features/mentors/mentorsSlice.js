import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchMentors from './mentorsAPI';

const initialState = {
  status: 'INITIALIZED',
  mentors: [],
};

export const fetchMentorsAsync = createAsyncThunk(
  'mentors/fetchMentors',
  async () => {
    const data = await fetchMentors();
    return data;
  },
);

const mentorsSlice = createSlice({
  name: 'mentors',
  initialState,
  extraReducers: {
    [fetchMentorsAsync.pending]: (state) => {
      state.status = 'FETCHING';
    },
    [fetchMentorsAsync.fulfilled]: (state, action) => {
      state.status = 'FETCHED';
      state.mentors = action.payload.data;
    },
    [fetchMentorsAsync.rejected]: (state) => {
      state.status = 'FAILED';
    },
  },
});

export default mentorsSlice;
