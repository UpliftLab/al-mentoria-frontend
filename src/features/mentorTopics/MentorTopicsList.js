import React from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import Rating from 'react-rating';
import { useSelector } from 'react-redux';

import ImageNotFound from '../../images/image-not-found.png';
import Loading from '../loading/loading';

const iconHandleError = (e) => {
  const imageElement = e.currentTarget;
  imageElement.src = ImageNotFound;
};

const MentorTopicsList = () => {
  const { status, mentorTopics } = useSelector((state) => state.mentorTopics);

  if (status === 'FETCHED') {
    if (mentorTopics.length) {
      return (
        <ul className="flex flex-col items-stretch w-80 gap-4">
          {mentorTopics.map(({ rating, topic: { label, icon } }) => (
            <li className="flex items-center gap-2 bg-white p-2 rounded" key={label}>
              <img src={icon} alt={`${label}'icon`} className="w-8 h-8 object-contain" onError={iconHandleError} />
              <p className="grow">{label}</p>
              <Rating
                step="0.5"
                initialRating={rating}
                readonly
                stop="2.5"
                fractions={2}
                emptySymbol={<BsStar color="#F4C362" />}
                fullSymbol={<BsStarFill color="#F4C362" />}
              />
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="text-white">No topic found!</div>
    );
  }

  if (status === 'FAILED') {
    return (
      <div>Failed!</div>
    );
  }

  // If status is not in any of the certain states (FETCHED or FAILED), show loading
  return (
    <Loading />
  );
};

export default MentorTopicsList;
