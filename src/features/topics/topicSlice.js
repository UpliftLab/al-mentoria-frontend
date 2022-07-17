import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userSlice from '../user/userSlice';
import getTopicsFromApi, { createTopicInApi } from './topicApi';

const initialState = {
  loading: false,
  topics: [],
};

export const getTopicsAsync = createAsyncThunk(
  'topics/getTopics',
  async (token) => {
    const data = await getTopicsFromApi(token);
    return data;
  },
);

export const addTopicAsync = createAsyncThunk(
  'topics/addTopic',
  async (data) => {
    const response = await createTopicInApi(data);
    return response;
  },
);

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: {
    [userSlice.actions.signOut]: () => initialState,
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
    [addTopicAsync.fulfilled]: (state, action) => {
      const { data } = action.payload;
      console.log(data);
      state.topics.push(data);
    },
  },
});

export default topicSlice;
