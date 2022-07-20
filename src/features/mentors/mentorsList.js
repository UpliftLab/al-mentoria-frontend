import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { fetchMentorsAsync } from './mentorsSlice';
import DirectionalButton from '../button/DirectionalButton';
import Loading from '../loading/loading';

const MentorsList = () => {
  /**
   * Component status:
   * - INITIALIZED: Must change to one of the followings as soon as possible
   * - FETCHING   : Temporary status while fetchig data
   * - FETCHED    : Data is recieved
   * - FAILED     : Data fetching failed
   */
  const { status, mentors } = useSelector((state) => state.mentors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (['INITIALIZED', 'FAILED'].includes(status)) {
      dispatch(fetchMentorsAsync());
    }
  }, []);

  const responsive = {
    0: { items: 1 },
    640: { items: 2 },
    768: { items: 3 },
    1024: { items: 4 },
  };

  const handleDragStart = (e) => e.preventDefault();

  const items = mentors.map((mentor) => (
    <Link to={`/mentors/${mentor.id}`} onDragStart={handleDragStart} key={mentor.id} className="flex flex-col gap-4 shrink-0 items-center text-center w-full">
      <img src={mentor.photo} className="aspect-square object-cover w-48" alt={mentor.name} />

      <h2 className="font-bold text-xl">
        {mentor.name}
      </h2>

      <hr className="mx-auto border-t-4 border-dotted w-32" />

      <p className="text-gray-400">
        {mentor.bio}
      </p>

      <ul className="flex flex-wrap gap-2 text-xs text-gray-400">
        {mentor.mentor_topics.map((mentorTopic) => (
          <li className="border py-1 px-2 rounded-lg hover:text-gray-600 hover:border-gray-300" key={`mentorTopic-${mentorTopic.id}`}>
            {mentorTopic.topic.label}
          </li>
        ))}
      </ul>
    </Link>
  ));

  return (
    <>
      {['INITIALIZED', 'FETCHING'].includes(status) && <Loading />}
      {['FAILED'].includes(status) && <>Failed to fetch mentors!</>}
      {(status === 'FETCHED' && mentors.length === 0) && <>Currently no mentor is available!</>}

      {(status === 'FETCHED' && mentors.length) && (
        <AliceCarousel
          mouseTracking
          disableDotsControls
          renderPrevButton={({ isDisabled }) => <DirectionalButton twClasses="absolute top-28 left-0" left disabled={isDisabled} />}
          renderNextButton={({ isDisabled }) => <DirectionalButton twClasses="absolute top-28 right-0" disabled={isDisabled} />}
          responsive={responsive}
          items={items}
          className="bg-red-500"
        />
      )}
    </>
  );
};

export default MentorsList;
