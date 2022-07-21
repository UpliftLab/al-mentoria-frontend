import { mentorDetailsSlice, fetchMentorAsync } from '../mentorDetailsSlice';

const initialState = {
  mentor: null,
  status: 'idle',
};

describe('MentorDetails Slice', () => {
  it('set the initial state', () => {
    expect(
      mentorDetailsSlice.reducer(undefined, { type: null }),
    ).toEqual(initialState);
  });

  it('set cleans up the state successfully', () => {
    const changedState = {
      mentor: {},
      status: 'not-idle',
    };
    expect(
      mentorDetailsSlice.reducer(
        changedState,
        mentorDetailsSlice.actions.cleanUp,
      ),
    ).toEqual(initialState);
  });

  it('updates the state while fetching data', () => {
    expect(
      mentorDetailsSlice.reducer(
        initialState,
        fetchMentorAsync.pending,
      ),
    ).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('updates the state after successful data fetch', () => {
    const payload = 'THE PAYLOAD';
    expect(
      mentorDetailsSlice.reducer(
        initialState,
        {
          type: fetchMentorAsync.fulfilled,
          payload,
        },
      ),
    ).toEqual({
      ...initialState,
      status: 'success',
      mentor: payload,
    });
  });

  it('updates the state after failing to fetch data', () => {
    expect(
      mentorDetailsSlice.reducer(
        initialState,
        fetchMentorAsync.rejected,
      ),
    ).toEqual({
      ...initialState,
      status: 'error',
    });
  });
});
