import { addMentorSlice, addMentorAsync } from '../addMentorSlice';
import { status } from '../../add-reservation/addReservationSlice';

const initialState = {
  status: status.idle,
};

describe('AddMentor Slice', () => {
  it('set the initial state', () => {
    expect(
      addMentorSlice.reducer(undefined, { type: null }),
    ).toEqual(initialState);
  });

  it('updates the state while fetching data', () => {
    expect(
      addMentorSlice.reducer(
        initialState,
        addMentorAsync.pending,
      ),
    ).toEqual({
      ...initialState,
      status: status.loading,
    });
  });

  it('updates the state after successful data fetch', () => {
    const payload = 'THE PAYLOAD';
    expect(
      addMentorSlice.reducer(
        initialState,
        {
          type: addMentorAsync.fulfilled,
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
      addMentorSlice.reducer(
        initialState,
        addMentorAsync.rejected,
      ),
    ).toEqual({
      ...initialState,
      status: status.error,
    });
  });
});
