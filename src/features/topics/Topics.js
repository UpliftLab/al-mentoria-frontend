import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topic from './Topic';
import { getTopicsAsync } from './topicSlice';

const Topics = () => {
  const { topics } = useSelector((state) => state.topic);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopicsAsync());
  }, []);

  return (
    <div className="flex flex-col m-12 justify-center items-center">
      {
        topics.map((topic) => (
          <Topic key={topic.id} text={topic.label} />
        ))
      }
    </div>
  );
};

export default Topics;
