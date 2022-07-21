import { addReservationSlice, bookReservationAsync, status } from '../addReservationSlice';

const initialState = {
  mentor: null,
  status: status.idle,
  selectedTopic: null,
};

describe('AddReservation Slice', () => {
  it('set the initial state', () => {
    expect(
      addReservationSlice.reducer(undefined, { type: null }),
    ).toEqual(initialState);
  });

  it('set the state on dispatching setMentor', () => {
    const payload = 'IMAGINARY PAYLOAD';
    expect(addReservationSlice.reducer(
      initialState,
      {
        type: addReservationSlice.actions.setMentor,
        payload,
      },
    )).toEqual(
      { ...initialState, mentor: payload },
    );
  });

  it('updates the state while fetching data', () => {
    expect(
      addReservationSlice.reducer(
        initialState,
        bookReservationAsync.pending,
      ),
    ).toEqual({
      ...initialState,
      status: status.loading,
    });
  });

  it('updates the state after successful data fetch', () => {
    const payload = 'IMAGINARY PAYLOAD';
    expect(
      addReservationSlice.reducer(
        initialState,
        {
          type: bookReservationAsync.fulfilled,
          payload,
        },
      ),
    ).toEqual({
      ...initialState,
      status: status.success,
    });
  });

  it('updates the state after failing to fetch data', () => {
    expect(
      addReservationSlice.reducer(
        initialState,
        bookReservationAsync.rejected,
      ),
    ).toEqual({
      ...initialState,
      status: status.error,
    });
  });
});
