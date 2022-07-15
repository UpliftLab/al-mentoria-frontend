import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading/loading';
import { fetchMentorsAsync } from './mentorsSlice';

const MentorsList = () => {
  const { status, mentors } = useSelector((state) => state.mentors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (['INITIALIZED', 'FAILED'].includes(status)) {
      dispatch(fetchMentorsAsync());
    }
  }, []);

  if (['INITIALIZED', 'FETCHING'].includes(status)) {
    return <Loading />;
  }

  if (['FAILED'].includes(status)) {
    return (
      <>Failed to fetch mentors!</>
    );
  }

  return (
    <ul>
      {mentors.map((mentor) => (
        <li key={mentor.id}>
          {mentor.name}
        </li>
      ))}
    </ul>
  );
};

export default MentorsList;
