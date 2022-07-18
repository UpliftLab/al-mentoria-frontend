import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { fetchReservations, deleteReservation } from './reservationsAPI';
import userSlice from '../user/userSlice';

const initialState = {
  reservations: {
    data: [],
    old: [],
  },
  reservationStatus: 'idle',
  isLoggedIn: null,
};

export const fetchReservationsAsync = createAsyncThunk(
  'reservations/fetchReservations',
  async ({ token }) => {
    const response = await fetchReservations(token);
    return response.data;
  },
);

export const deleteReservationAsync = createAsyncThunk(
  'reservations/deleteReservation',
  async ({ token, id }) => {
    const response = await deleteReservation(token, id);
    if (response.status === 'success') {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  extraReducers: {
    [fetchReservationsAsync.pending]: (state) => {
      state.reservationStatus = 'loading';
    },
    [fetchReservationsAsync.fulfilled]: (state, action) => {
      const oldData = action.payload?.filter((reservation) => {
        const now = new Date();
        const reservationDate = new Date(reservation.date);
        return reservationDate < now;
      });
      state.reservations.old = oldData;
      const newData = action.payload?.filter((reservation) => {
        const now = new Date();
        const reservationDate = new Date(reservation.date);
        return reservationDate > now;
      });
      state.reservations.data = newData;
      state.reservationStatus = 'success';
    },
    [fetchReservationsAsync.rejected]: (state) => {
      state.reservationStatus = 'error';
    },
    [deleteReservationAsync.pending]: (state) => {
      state.reservationStatus = 'loading';
    },
    [deleteReservationAsync.fulfilled]: (state, action) => {
      state.reservationStatus = 'success';
      const data = current(state).reservations.data.filter(
        (reservation) => reservation.id !== action.payload.id,
      );
      state.reservations.data = data;
    },
    [deleteReservationAsync.rejected]: (state) => {
      state.reservationStatus = 'error';
    },
    [userSlice.actions.signOut]: () => initialState,
  },
});

export default reservationsSlice;
