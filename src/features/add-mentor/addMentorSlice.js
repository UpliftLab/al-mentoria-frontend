import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { status } from '../add-reservation/addReservationSlice';
import addMentorAPI from './addMentorAPI';

export const addMentorAsync = createAsyncThunk(
  'addMentor',
  async ({
    name, photo, bio, token,
  }) => {
    const result = await addMentorAPI({
      name,
      photo,
      bio,
      token,
    });
    return result;
  },
);

const initialState = {
  status: status.idle,
};

export const addMentorSlice = createSlice({
  name: 'addMentor',
  initialState,
  extraReducers: {
    [addMentorAsync.pending]: (state) => {
      state.status = status.loading;
    },
    [addMentorAsync.fulfilled]: (state) => {
      state.status = status.success;
    },
    [addMentorAsync.rejected]: (state) => {
      state.status = status.error;
    },
  },
});

export default addMentorSlice.reducer;
