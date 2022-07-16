import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Topic from './Topic';
import { getTopicsAsync } from './topicSlice';
import userSlice, { authenticateAsync } from '../user/userSlice';

const Topics = () => {
  const { topics } = useSelector((state) => state.topic);
  const { token, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTopicsAsync(token))
        .unwrap()
        .then(() => {
          toast.success('successfully fetched topics');
        })
        .catch((error) => {
          toast.error(error.message);
          navigate('/');
        });
    } else if (token) {
      dispatch(authenticateAsync(token))
        .unwrap()
        .then(() => {
          toast.success('authenticated!');
          dispatch(getTopicsAsync(token))
            .unwrap()
            .then(() => {
              toast.success('successfully fetched topics');
            })
            .catch((error) => {
              toast.error(error.message);
              navigate('/');
            });
        })
        .catch(() => {
          toast.error('You need to login!');
          dispatch(userSlice.actions.signOut());
        });
    } else {
      toast.error('You need to login!');
      navigate('/signin');
    }
  }, [token]);

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
