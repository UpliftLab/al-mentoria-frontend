import userSlice, { userStatus, signinAsync, authenticateAsync } from '../userSlice';
import PersistData from '../../../app/persistData';

const storage = new PersistData();

const initialState = {
  status: userStatus.initialized,
  token: storage.get('token'),
  name: '',
  role: '',
};

describe('User Reducer', () => {
  it('sets the initial state', () => {
    expect(userSlice.reducer(undefined, { type: null })).toEqual(initialState);
  });

  it('successfully update state on sign out', () => {
    expect(userSlice.reducer(
      initialState, userSlice.actions.signOut,
    )).toEqual({
      ...initialState,
      status: userStatus.unauthenticated,
    });
  });

  it('successfully update state on request for setUnauthenticated request', () => {
    expect(userSlice.reducer(
      initialState, userSlice.actions.setUnauthenticated,
    )).toEqual({
      ...initialState,
      status: userStatus.unauthenticated,
    });
  });

  it('updates the state to authenticating while signing in', () => {
    expect(userSlice.reducer(
      initialState, signinAsync.pending,
    )).toEqual({
      ...initialState,
      status: userStatus.authenticating,
    });
  });

  it('updates the state to authenticated after successful signin', () => {
    const expectedResponse = {
      token: 'abcd',
      name: 'Mostafa',
      role: 'admin',
    };
    expect(userSlice.reducer(
      initialState,
      {
        type: signinAsync.fulfilled,
        payload: { data: expectedResponse },
      },
    )).toEqual({
      ...initialState,
      ...expectedResponse,
      status: userStatus.authenticated,
    });
  });

  it('updates the state to authenticating while authenticating', () => {
    expect(userSlice.reducer(
      initialState, authenticateAsync.pending,
    )).toEqual({
      ...initialState,
      status: userStatus.authenticating,
    });
  });

  it('updates the state to authenticated after successful authentication', () => {
    const expectedResponse = {
      token: 'abcd',
      name: 'Mostafa',
      role: 'admin',
    };
    expect(userSlice.reducer(
      initialState,
      {
        type: authenticateAsync.fulfilled,
        payload: { data: expectedResponse },
      },
    )).toEqual({
      ...initialState,
      ...expectedResponse,
      status: userStatus.authenticated,
    });
  });

  it('updates the state to rejected after authentication failure', () => {
    expect(userSlice.reducer(
      initialState, authenticateAsync.rejected,
    )).toEqual({
      ...initialState,
      status: userStatus.rejected,
    });
  });
});
