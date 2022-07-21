import reservationsSlice, { fetchReservationsAsync } from '../reservationsSlice';

const initialState = {
  reservations: {
    data: [],
    old: [],
  },
  reservationStatus: 'idle',
  isLoggedIn: null,
};

describe('Reservation Slice', () => {
  it('set the initial state', () => {
    expect(
      reservationsSlice.reducer(undefined, { type: null }),
    ).toEqual(initialState);
  });

  it('updates the state while fetching data', () => {
    expect(
      reservationsSlice.reducer(
        initialState,
        fetchReservationsAsync.pending,
      ),
    ).toEqual({
      ...initialState,
      reservationStatus: 'loading',
    });
  });

  it('updates the state after failing to fetch data', () => {
    expect(
      reservationsSlice.reducer(
        initialState,
        fetchReservationsAsync.rejected,
      ),
    ).toEqual({
      ...initialState,
      reservationStatus: 'error',
    });
  });
});
