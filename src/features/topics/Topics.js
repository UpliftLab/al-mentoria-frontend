import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Topic from './Topic';
import { getTopicsAsync } from './topicSlice';
import { userStatus } from '../user/userSlice';

const Topics = () => {
  const { topics } = useSelector((state) => state.topic);
  const { token, status, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      status === userStatus.unauthenticated
      || status === userStatus.rejected
      || status === userStatus.failed
    ) {
      toast.error('You need to login!');
      navigate('/signin');
    } else if (status === userStatus.authenticated) {
      if (role === 'admin') {
        dispatch(getTopicsAsync(token))
          .unwrap()
          .then(() => {
            toast.success('successfully fetched topics');
          })
          .catch((error) => {
            navigate('/');
            toast.error(error.message);
          });
      } else {
        navigate('/');
        toast.error('You are not authorized');
      }
    }
  }, [status]);

  return (
    <div className="flex flex-col m-12 justify-center items-center">
      {
        topics.map((topic) => (
          <Topic key={topic.id} label={topic.label} icon={topic.icon} />
        ))
      }
    </div>
  );
};

export default Topics;
