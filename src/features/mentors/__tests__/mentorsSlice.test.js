import mentorsSlice, { fetchMentorsAsync } from '../mentorsSlice';

const initialState = {
  status: 'INITIALIZED',
  mentors: [],
};

describe('Mentors reducer', () => {
  it('initializes the state with initial values', () => {
    expect(mentorsSlice.reducer(undefined, { type: null })).toEqual(initialState);
  });

  it('sets state status to FETCHING while fetching process is pending', () => {
    expect(mentorsSlice.reducer(
      initialState, fetchMentorsAsync.pending,
    )).toEqual({
      ...initialState,
      status: 'FETCHING',
    });
  });

  it('sets state status to FETCHED if fetching process is successful', () => {
    expect(mentorsSlice.reducer(
      initialState, { type: fetchMentorsAsync.fulfilled, payload: { data: ['fetched data'] } },
    )).toEqual({
      status: 'FETCHED',
      mentors: ['fetched data'],
    });
  });

  it('sets state status to FAILED if fetching process fail', () => {
    expect(mentorsSlice.reducer(
      initialState, fetchMentorsAsync.rejected,
    )).toEqual({
      ...initialState,
      status: 'FAILED',
    });
  });
});
