import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMentorDetailsAsync } from './mentorDetailsSlice';

const MentorDetailsPage = () => {
  const dispatch = useDispatch();
  const { mentorDetails } = useSelector(
    (state) => state.mentorDetails,
  );
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchMentorDetailsAsync(id));
  }, []);
  return (
    <div>
      <h1>
        {console.log(mentorDetails)}
        Mentor Details
        {id}
      </h1>
    </div>
  );
};

export default MentorDetailsPage;
