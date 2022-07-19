import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MentorTopicsList from './MentorTopicsList';
import { fetchMentorTopicsAsync } from './mentorTopicsSlice';

const MentorTopics = () => {
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMentorTopicsAsync({ id, token }));
  }, []);

  return (
    <>
      <hr className="w-32 border-t-4 border-dotted" />
      <MentorTopicsList />
    </>
  );
};

export default MentorTopics;
