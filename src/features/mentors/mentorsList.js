import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
    return (
      <Loading />
    );
  }

  if (['FAILED'].includes(status)) {
    return (
      <>Failed to fetch mentors!</>
    );
  }

  return (
    <ul className="flex gap-4 w-full overflow-x-auto">
      {mentors.map((mentor) => (
        <li key={mentor.id}>
          <Link to={`/mentors/${mentor.id}`} className="flex flex-col gap-4 shrink-0 items-center text-center w-80">
            <img src={mentor.photo} className="aspect-square object-cover w-48" alt={mentor.name} />

            <h2 className="font-bold text-xl">
              {mentor.name}
              {mentor.id}
            </h2>

            <hr className="mx-auto border-t-4 border-dotted w-32" />

            <p className="text-gray-400">
              {mentor.bio}
            </p>

            <ul className="flex flex-wrap gap-2 text-xs text-gray-400">
              {mentor.mentor_topics.map((mentorTopic) => (
                <li className="border py-1 px-2 rounded-lg hover:text-gray-600 hover:border-gray-300" key={mentorTopic.topic.id}>
                  {mentorTopic.topic.label}
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MentorsList;
