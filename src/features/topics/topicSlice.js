import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getTopicsFromApi from './topicApi';

const initialState = {
  loading: false,
  topics: [],
};

export const getTopicsAsync = createAsyncThunk(
  'topics/getTopics',
  async () => {
    const data = await getTopicsFromApi();
    return data;
  },
);

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: {
    [getTopicsAsync.pending]: (state) => {
      state.loading = true;
    },
    [getTopicsAsync.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.topics = data;
    },
    [getTopicsAsync.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default topicSlice;
