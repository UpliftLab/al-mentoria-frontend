import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchReservations from './ReservationsAPI';

const initialState = {
  reservations: {
    data: [],
  },
  status: 'idle',
}

export const fetchReservationsAsync = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    const response = await fetchReservations();
    return response.data;
  },
);

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  extraReducers: {
    [fetchReservationsAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchReservationsAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.reservations = action.payload;
    },
    [fetchReservationsAsync.rejected]: (state) => {
      state.status = 'error';
    }
  }
});

export default reservationsSlice.reducer;
