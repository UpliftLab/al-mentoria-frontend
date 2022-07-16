import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PersistData from '../../app/persistData';
import { authenticate, signinRequest, signup } from './userApi';

export const userStatus = {
  initialized: 'INITIALIZED',
  unauthenticated: 'UNAUTHENTICATED',
  authenticating: 'AUTHENTICATING',
  authenticated: 'AUTHENTICATED',
  rejected: 'REJECTED',
  failed: 'FAILED',
};

const storage = new PersistData();

const initialState = {
  status: userStatus.initialized,
  isLoggedIn: false,
  token: storage.get('token'),
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
      storage.remove('token');
      return {
        ...initialState,
        status: userStatus.unauthenticated,
      };
    },
    setUnauthenticated: (state) => {
      state.status = userStatus.unauthenticated;
    },
  },
  extraReducers: {
    [signinAsync.pending]: (state) => {
      state.status = userStatus.authenticating;
    },
    [signinAsync.fulfilled]: (state, action) => {
      const { data } = action.payload;
      storage.set('token', data.token);
      return {
        ...state,
        ...data,
        isLoggedIn: true,
        status: userStatus.authenticated,
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
      state.status = userStatus.authenticating;
    },
    [authenticateAsync.fulfilled]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        ...data,
        isLoggedIn: true,
        status: userStatus.authenticated,
      };
    },
    [authenticateAsync.rejected]: (state) => {
      state.status = userStatus.rejected;
    },
  },
});

export default userSlice;
