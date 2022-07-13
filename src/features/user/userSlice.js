import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import signinRequest from './userApi';

const initialState = {
  loading: false,
  isLoggedIn: false,
  token: '',
  name: '',
  role: '',
};

export const signinAsync = createAsyncThunk(
  'users/signin',
  async ({ email, password }) => {
    const data = await signinRequest(email, password);
    return data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut: () => initialState,
  },
  extraReducers: {
    [signinAsync.pending]: (state) => {
      state.loading = true;
    },
    [signinAsync.fulfilled]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        ...data,
        isLoggedIn: true,
        loading: false,
      };
    },
  },
});

export default userSlice;
