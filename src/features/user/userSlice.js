import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signinRequest, signup } from './userApi';

const initialState = {
  loading: false,
  isLoggedIn: false,
  token: '',
  name: '',
  role: '',
};

export const signinAsync = createAsyncThunk(
  'user/signin',
  async ({ email, password }) => {
    const data = await signinRequest(email, password);
    return data;
  },
);

export const signupAsync = createAsyncThunk(
  'user/signup',
  async ({ name, email, password }) => {
    const data = await signup(name, email, password);
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
    [signupAsync.pending]: (state) => {
      state.loading = true;
    },
    [signupAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.data.token;
    },
  },
});

export default userSlice;
