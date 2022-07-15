import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PersistData from '../../app/persistData';
import { authenticate, signinRequest, signup } from './userApi';

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

export const authenticateAsync = createAsyncThunk(
  'user/authenticate',
  async (token) => {
    const userData = await authenticate(token);
    return userData;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut: () => {
      const storage = new PersistData();
      storage.remove('token');
      return initialState;
    },
  },
  extraReducers: {
    [signinAsync.pending]: (state) => {
      state.loading = true;
    },
    [signinAsync.fulfilled]: (state, action) => {
      const { data } = action.payload;
      const storage = new PersistData('al-mentoria-data');
      storage.set('token', data.token);
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
    [signupAsync.fulfilled]: (state) => {
      state.loading = false;
    },
    [signupAsync.rejected]: (state) => {
      state.loading = false;
    },
    [authenticateAsync.pending]: (state) => {
      state.loading = true;
    },
    [authenticateAsync.fulfilled]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        ...data,
        isLoggedIn: true,
        loading: false,
      };
    },
    [authenticateAsync.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default userSlice;
